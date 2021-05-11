const express = require("express");
const app = express();
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

//this will compress/minimise the size of the response we send
app.use(compression());

// retrieving static files
app.use(express.static(path.join(__dirname, "..", "client", "public")));

// Cookie session
app.use(
    cookieSession({
        secret: `${SECRET_KEY}`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

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

//do not delete or comment out EVER
app.get("*", function (req, res) {
    if (!req.session.user_Id) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});
//////////////////////////////////////////////////////////////////////////////////////POST REQUESTS

app.post("/registration", (req, res) => {
    console.log("This was a POST REQUEST MADE TO THE /Registration route.");
    const { first_name, last_name, email, password } = req.body;
    if (password) {
        //hash password
        hash(password)
            .then((password_hash) => {
                //hash the password
                db.addUserRegistrationInformation(
                    first_name,
                    last_name,
                    email,
                    password_hash
                )
                    .then((result) => {
                        req.session.user_Id = result.rows[0].id;
                        console.log("USER ID COOKIE", req.session.user_Id);
                        res.json({
                            success: true,
                        });
                    })
                    .catch((err) => {
                        console.log(
                            "Error in saving Users registration data",
                            err
                        );
                    });
            })
            .catch((err) => {
                console.log("error in hash", err);
            });
    }
});

app.post("/login", (req, res) => {
    console.log("This was a POST request to the /login route");
    const { email, password } = req.body;
    if (email) {
        db.retrivingUserEmail(email)
            .then((result) => {
                if (result) {
                    // Verifying Passwords:
                    compare(password, result.rows[0].password_hash)
                        .then((comparison) => {
                            // comparison will be true or false
                            if (comparison) {
                                console.log("comparison results", result);
                                req.session.user_Id = result.rows[0].id;
                                res.json({
                                    success: true,
                                });
                            } else {
                                if (!comparison) {
                                    res.json({
                                        success: false,
                                    });
                                }
                            }
                        })
                        .catch((err) => {
                            console.log(
                                "Password Comparison does not match",
                                err
                            );
                        });
                }
            })
            .catch((err) => {
                console.log("Error in retriving Email", err);
            });
    }
});

app.post("/password/reset/email", (req, res) => {
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

app.post("/password/reset/verify", (req, res) => {
    console.log("post request made to the /password/rest/verify route");
    db.compareCodeToEmail()
        .then((result) => {
            console.log("Result in comparing code to email", result);
            const { password } = req.body;
            const email = result.rows[0].email;
            if (password) {
                hash(password)
                    .then((password_hash) => {
                        db.updateUserPassword(password_hash, email).then(
                            (result) => {
                                console.log(
                                    "Result in updating the password",
                                    result
                                );
                                res.json({
                                    success: true,
                                });
                            }
                        );
                    })
                    .catch((err) => {
                        console.log("error in hash", err);
                    });
            }
        })
        .catch((err) => {
            console.log(
                "Error in comparing the the code and email verification",
                err
            );
            res.json({
                success: false,
            });
        });
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

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    console.log("upload Worked!!!!");
    console.log("req.file", req.file); // req.file comes fom multer
    if (req.file) {
        // this will run if everything works
        let s3Url = s3url.s3Url;
        const prefixedFilename = s3Url.concat(req.file.filename);
        console.log("Prefixed Filename", prefixedFilename);
        //instert into images
        db.addImageUploadToAWS(prefixedFilename, req.session.user_Id)
            .then((result) => {
                console.log("Result in addimageUpload to AWS", result);
                // send back a response using res.json
                res.json({
                    success: true,
                    payload: result.rows,
                });
            })
            .catch((err) => {
                console.log("Error in adding the img to AWS", err);
            });
    } else {
        res.json({
            success: false,
        });
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
