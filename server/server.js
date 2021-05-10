const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
//cookie parser put in here
const db = require("./sql/db");
const SECRET_KEY =
    process.env.SECRET_KEY || require("../secrets.json").SECRET_KEY;
const { hash, compare } = require("../client/utils/bc.js");
const csurf = require("csurf");

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

// app.get("/login", (req, res) => {
//     if (req.session.user_Id) {
//         res.redirect("/home");
//     } else {
//         res.sendFile(path.join(__dirname, "..", "client", "index.html"));
//     }
// });

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
                                req.session.user_id = result.rows[0].id;
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

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
