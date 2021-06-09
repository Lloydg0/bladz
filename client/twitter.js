const secrets = require("../secrets.json");
const https = require("https");

module.exports.getToken = (callback) => {
    const creds = `${secrets.TWITTER_Key}:${secrets.TWITTER_Secret}`;
    const encodedCreds = Buffer.from(creds).toString("base64");
    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Basic ${encodedCreds}`,
        },
    };

    function cb(response) {
        if (response.statusCode != 200) {
            callback(response.statusCode);
        }
        let body = "";
        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            const parsedBody = JSON.parse(body);
            callback(null, parsedBody.access_token);
        });
    }

    const req = https.request(options, cb);
    req.end("grant_type=client_credentials");
};

module.exports.getTweets = (token, screen_name, callback) => {
    const options = {
        host: "api.twitter.com",
        path: `/1.1/statuses/user_timeline.json?screen_name=${screen_name}&tweet_mode=extended`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    function cb(response) {
        if (response.statusCode != 200) {
            callback(response.statusCode);
        }
        let body = "";
        response.on("data", function (chunk) {
            body += chunk;
        });

        response.on("end", function () {
            const parsedTweets = JSON.parse(body);
            callback(null, parsedTweets);
        });
    }

    const req = https.request(options, cb);
    req.end();
};

module.exports.filterTweets = (callback) => {
    const obj = callback;
    let newArr = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].entities.urls.length === 1) {
            let newObj = {
                href: obj[i].entities.urls[0].url,
                text: obj[i].full_text,
                name: obj[i].user.name,
                time: obj[i].created_at,
            };
            newArr.push(newObj);
        }
    }
    return newArr;
};
