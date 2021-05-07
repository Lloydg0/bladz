const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const db = require("./sql/db");
const SECRET_KEY =
    process.env.SECRET_KEY || require("../secrets.json").SECRET_KEY;
const { hash, compare } = require("../client/utils/bc.js");

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

// url encoded parser
app.use(
    express.urlencoded({
        extended: false,
    })
);

//express json
app.use(express.json());

// //Preventing Vulnerablilities (must come after cookie session)
// app.use(csurf());
// app.use(function (req, res, next) {
//     //stopping clickjacking
//     res.setHeader("x-frame-options", "deny");
//     //stopping CSRF
//     res.locals.csrfToken = req.csrfToken();
//     next();
// });

//checking to see if there has been cookies
app.use((req, res, next) => {
    console.log("req.url: ", req.url);
    console.log("req.session", req.session);
    console.log("req.body", req.body);

    next();
});

//////////////////////////////////////////////////////////////////////////////// GET REQUESTS

// app.get("/welcome", (req, res) => {
//     if (req.session.user_Id) {
//         res.redirect("/");
//     } else {
//         res.sendFile(path.join(__dirname, "..", "client", "index.html"));
//     }
// });

//do not delete or comment out EVER
// app.get("*", function (req, res) {
//     if (!req.session.user_Id) {
//         res.redirect("/welcome");
//     } else {
//         res.sendFile(path.join(__dirname, "..", "client", "index.html"));
//     }
// });

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});
//////////////////////////////////////////////////////////////////////////////////////POST REQUESTS

app.post("/welcome ", (req, res) => {
    console.log("This was a POST REQUEST MADE TO THE /WELCOME route.");
    const { first_name, last_name, email, password } = req.body;
    if (password) {
        //hash password
        hash(password)
            .then((password_hash) => {
                //hash the password
                db.addUserRegistrationInformation({
                    first_name,
                    last_name,
                    email,
                    password_hash,
                })
                    .then((result) => {
                        req.session.user_id = result.rows[0].id;
                        res.redirect("/");
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

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
