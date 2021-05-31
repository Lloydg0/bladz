const express = require("express");
const app = express();
let { getToken, getTweets, filterTweets } = require("../client/twitter.js");
let { getCoins } = require("../client/coinmarketcap.js");
const util = require("util");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./sql/db");
const SECRET_KEY =
    process.env.SECRET_KEY || require("../secrets.json").SECRET_KEY;
const { hash, compare } = require("../client/utils/bc.js");
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const { sendEmail } = require("./ses");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

//the following ocde is required to uoload files
const s3 = require("../s3");
let s3url = require("../config.json");
const multer = require("multer");
const uidSafe = require("uid-safe");
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});
const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152, //files over 2mb cannot be uploaded used to stop ddos attacks (if upload does not work, check the size of the file as it might be too big and not a bug in the code).
    },
});
////// end of code that uploads the files

//this will compress/minimise the size of the response we send
app.use(compression());

// retrieving static files
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// const cookieSession = require("cookie-session");
const cookieSessionMiddleware = cookieSession({
    secret: `${SECRET_KEY}`,
    maxAge: 1000 * 60 * 60 * 24 * 90,
});

app.use(cookieSessionMiddleware);
io.use(function (socket, next) {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

//Preventing Vulnerablilities (must come after cookie session)
app.use(csurf());

app.use(function (req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

// url encoded parser
app.use(
    express.urlencoded({
        extended: false,
    })
);

//express json
app.use(express.json());

//checking to see if there has been cookies
app.use((req, res, next) => {
    console.log("req.url: ", req.url);
    console.log("req.session", req.session);
    console.log("req.body", req.body);

    next();
});

//////////////////////////////////////////////////////////////////////////////// GET REQUESTS

app.get("/welcome", (req, res) => {
    if (req.session.user_Id) {
        res.redirect("/home");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.get("/logout", (req, res) => {
    req.session = null;
    res.redirect("/welcome");
});

app.get("/home", async (req, res) => {
    console.log("a request made to home route");
    const loggedInUser = req.session.user_Id;
    try {
        const { rows } = await db.selectingUserInfo(loggedInUser);
        console.log("rows", rows);
        res.json({
            success: true,
            payload: rows,
        });
    } catch (err) {
        console.log("err in showing top 3 users from the Database", err);
    }
});

app.get("/news", (req, res) => {
    console.log("made it to requesting news from twitter!");

    getToken = util.promisify(getToken);
    getTweets = util.promisify(getTweets);

    getToken()
        .then((token) => {
            return Promise.all([
                getTweets(token, "Cointelegraph"),
                getTweets(token, "TheDailyHodl"),
                getTweets(token, "CoinMarketCap"),
            ]).then(([Cointelegraph, TheDailyHodl, CoinMarketCap]) => {
                let combined = [
                    ...Cointelegraph,
                    ...TheDailyHodl,
                    ...CoinMarketCap,
                ];
                let sortedChronologically = combined.sort((a, b) => {
                    new Date(b.created_at) - new Date(a.created_at);
                });
                return sortedChronologically;
            });
        })
        .then((tweets) => {
            res.json(filterTweets(tweets));
        })
        .catch((err) => {
            console.log("Error in Getting token", err);
            res.sendStatus(500);
        });
});

app.get("/coins", (req, res) => {
    console.log(
        "Made it into the server request for getting coins from CMC api"
    );

    getCoins()
        .then((response) => {
            console.log("result in getting the coins back", response);
        })
        .catch((err) => {
            console.log("error in getting coins", err);
        });
});

//////////////////////////////////////////////////////////////////////////////////////POST REQUESTS

app.post("/registration", async (req, res) => {
    console.log("This was a POST REQUEST MADE TO THE /Registration route.");
    const { first_name, last_name, email, password } = req.body;

    try {
        const password_hash = await hash(password);
        const { rows } = await db.addUserRegistrationInformation(
            first_name,
            last_name,
            email,
            password_hash
        );
        req.session.user_Id = rows[0].id;
        res.json({
            success: true,
        });
    } catch (err) {
        console.log("Error in saving Users registration data", err);
    }
});

app.post("/login", async (req, res) => {
    console.log("This was a POST request to the /login route");
    const { email, password } = req.body;

    try {
        const { rows } = await db.retrivingUserEmail(email);
        const comparison = await compare(password, rows[0].password_hash);
        if (comparison) {
            req.session.user_Id = rows[0].id;
            res.json({
                success: true,
            });
        }
    } catch (err) {
        console.log("Error in retriving Email", err);
        res.json({
            success: false,
        });
    }
});

app.post("/password/reset/email", async (req, res) => {
    console.log("A post request was made to the /password/reset/email route");
    const { email } = req.body;
    const code = cryptoRandomString({ length: 6 });

    if (email) {
        db.retrivingUserEmail(email)
            .then((result) => {
                if (result) {
                    console.log(
                        "Result in retrieving email for the password reset",
                        result
                    );
                    db.addResetCode(code, email)
                        .then((result) => {
                            console.log(
                                "Result in adding code to Database",
                                result
                            );
                            sendEmail(
                                email,
                                "Please find the Verification code in this email",
                                result.rows[0].code
                            );
                            res.json({
                                success: true,
                            });
                        })
                        .catch((err) => {
                            console.log(
                                "Error in Adding new verifcation code to Data base",
                                err
                            );
                            res.json({
                                success: false,
                            });
                        });
                }
            })
            .catch((err) => {
                console.log("Error in retriving Email", err);
            });
    }
});

app.post("/password/reset/verify", async (req, res) => {
    console.log("post request made to the /password/rest/verify route");
    const { password } = req.body;

    try {
        const { rows } = await db.compareCodeToEmail();
        const email = rows[0].email;
        const password_hash = await hash(password);
        const updateUserPassword = await db.updateUserPassword(
            password_hash,
            email
        );
        res.json({
            success: true,
        });
        return updateUserPassword;
    } catch (err) {
        console.log(
            "Error in comparing the the code and email verification",
            err
        );
        res.json({
            success: false,
        });
    }
});

app.post("/upload", uploader.single("file"), s3.upload, async (req, res) => {
    console.log("upload Worked!!!!");
    console.log("req.file", req.file); // req.file comes fom multer
    let s3Url = s3url.s3Url;
    const prefixedFilename = s3Url.concat(req.file.filename);
    console.log("Prefixed Filename", prefixedFilename);
    try {
        const { rows } = await db.addImageUploadToAWS(
            prefixedFilename,
            req.session.user_Id
        );
        console.log("rows", rows);
        res.json({
            success: true,
            payload: rows,
        });
    } catch (err) {
        console.log("Error in adding the img to AWS", err);
        res.json({
            success: false,
        });
    }
});

app.post("/bio", async (req, res) => {
    console.log("post request made to the /bio route");
    const { draftBio } = req.body;

    try {
        const { rows } = await db.updateUserBio(draftBio, req.session.user_Id);
        console.log("rows", rows);
        res.json({
            success: true,
            payload: rows,
        });
    } catch (err) {
        console.log("Error in adding bio on server side", err);
    }
});

app.post("/users/:id", async (req, res) => {
    console.log("req.params", req.params);
    const { id } = req.params;
    try {
        const { rows } = await db.retrivingOtherUserProfileInformation(id);
        res.json({
            success: true,
            payload: rows,
            user: req.session.user_Id,
        });
    } catch (err) {
        console.log("Error in getting other user profiles information", err);
    }
});

app.get("/find/users", async (req, res) => {
    console.log("a request made to the find users route");
    try {
        const { rows } = await db.showingTopThreeUsers();
        console.log("Rows in showing top 3", rows);
        res.json({
            success: true,
            payload: rows,
        });
    } catch (err) {
        console.log("err in showing top 3 users from the Database", err);
    }
});

app.get("/find/users/:id", async (req, res) => {
    console.log("a request made to the find users search route");
    console.log("req.params", req.params);
    try {
        const { rows } = await db.searchForOtherUsers(req.params.id);
        console.log("result in searching for other users", rows);
        res.json({
            success: true,
            payload: rows,
        });
    } catch (err) {
        console.log("err in finding users from the Database", err);
    }
});

app.get("/friendRequest/:id", async (req, res) => {
    console.log("a request was made to the GET friuend request route");
    const loggedInUser = req.session.user_Id;
    const viewedUser = req.params.id;
    console.log("LogginInUser", loggedInUser);
    console.log("ViewedUser", req.params.id);

    try {
        const { rows } = await db.decideFriendshipButtonToSend(
            loggedInUser,
            viewedUser
        );
        console.log("Result in friendship butting GET request", rows);
        res.json({
            success: true,
            payload: rows,
            loggedInUser,
            viewedUser,
        });
    } catch (err) {
        console.log("Error in friendship button get reqwuest", err);
    }
});

app.post("/friendRequest/:id", async (req, res) => {
    const viewedUserId = req.params.id;
    const buttonText = req.body.buttonText;
    const loggedInUser = req.session.user_Id;
    console.log("a request was made to the POST friend request route");
    console.log("buttonText", buttonText);
    if (buttonText == "Add Friend")
        try {
            const { rows } = await db.friendRequestSent(
                viewedUserId,
                loggedInUser,
                false
            );
            res.json({
                success: true,
                payload: rows[0].accepted,
                buttonText: "Cancel Friend Request",
            });
        } catch (err) {
            console.log("ERROR IN SENDING FRIEND REQUEST", err);
        }

    if (buttonText == "Accept Friend Request")
        try {
            console.log("before the db request");
            const { rows } = await db.acceptRequestSent(
                viewedUserId,
                loggedInUser
            );
            console.log("after the db request", rows);
            res.json({
                success: true,
                // payload: rows[0].accepted,
                payload: rows,
                buttonText: "Remove Friend",
            });
        } catch (err) {
            console.log("ERROR IN ACCEPTING FRIEND REQUEST", err);
        }

    if (
        buttonText == "Remove Friend" ||
        buttonText == "Cancel Friend Request" ||
        buttonText == "Decline Friend Request"
    )
        try {
            const { rows } = await db.deleteFriend(viewedUserId, loggedInUser);
            res.json({
                success: true,
                payload: rows,
                buttonText: "Add Friend",
            });
        } catch (err) {
            console.log("ERROR IN REMOVING FRIEND REQUEST", err);
        }
});

app.get("/friends-wannabes", async (req, res) => {
    console.log("a request made to the friend/wannabes route");
    const loggedInUser = req.session.user_Id;
    console.log("LogginInUser", loggedInUser);
    try {
        const { rows } = await db.selectingFriendsOrFriendRequests(
            loggedInUser
        );
        console.log("getting response for friend requests", rows);
        res.json({
            success: true,
            payload: rows,
            loggedInUser,
        });
    } catch (err) {
        console.log("A error in the friend or requesters route", err);
    }
});

app.post("/delete-user", async (req, res) => {
    const loggedInUser = req.session.user_Id;

    Promise.all([
        db.deleteUserFromUsers(loggedInUser),
        db.deleteUserFromMessages(loggedInUser),
        db.deleteUserFromComments(loggedInUser),
    ])
        .then(() => {
            req.session = null;
            res.redirect("/welcome");
            // await db.deleteUser(loggedInUser);
        })
        .catch((err) => {
            console.log("A error in deleting user", err);
        });
});

//do not delete or comment out EVER
app.get("*", function (req, res) {
    if (!req.session.user_Id) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

const onlineUsers = {};
io.on("connection", function (socket) {
    const user_Id = socket.request.session.user_Id;
    onlineUsers[socket.id] = user_Id;
    console.log("online users", onlineUsers);
    console.log(`Socket with the ID ${socket.id} is now connected`);

    if (!socket.request.session.user_Id) {
        return socket.disconnect(true);
    }
    console.log("userID in sockets", user_Id);
    db.getting10MostRecentMessages()
        .then((results) => {
            // console.log("results", results);
            io.sockets.emit("chatMessages", results.rows.reverse());
        })
        .catch(console.log);

    socket.on("chatMessage", (msg) => {
        console.log("msg", msg);

        db.insertNewMessage(user_Id, msg)
            .then((result) => {
                console.log("Result in inserting the message", result.rows[0]);
                db.retrieveInsertedNewMessage(user_Id, msg)
                    .then((result) => {
                        io.sockets.emit("chatMessage", result.rows[0]);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

    socket.on("commentOnWall", ({ id }) => {
        console.log("ID IN COMMENT ON WALL", id);
        db.latestComments(id)
            .then((results) => {
                console.log("results in getting latest comments", results);
                io.to(socket.id).emit("comments", results.rows.reverse());
            })
            .catch(console.log);
    });

    socket.on("comment", ({ text, id }) => {
        console.log("comment", text);
        let recipient_id = id;
        console.log("recepient id", recipient_id);

        db.postingComments(recipient_id, user_Id, text)
            .then((result) => {
                console.log("Result in inserting the comment", result.rows[0]);
                db.retrievePostedComment(user_Id, recipient_id)
                    .then((result) => {
                        console.log(
                            "Result in retrieving last comment",
                            result.rows[0]
                        );
                        io.to(socket.id).emit("comment", result.rows[0]);
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

    socket.on("disconnect", () => {
        console.log(
            `User ${user_Id} just disconnected with socket ${socket.id}`
        );
        delete onlineUsers[socket.id];
    });
});

// if (require.main == module) {
//     app.listen(process.env.PORT || 3001);
// }
