//requring jSON and https modules
const secrets = require("../secrets.json");
const https = require("https");

//Getting the bearer token from twitter
module.exports.getToken = (callback) => {
    //encoding the credentials
    const creds = `${secrets.TWITTER_Key}:${secrets.TWITTER_Secret}`;
    const encodedCreds = Buffer.from(creds).toString("base64");
    // creating POST options object that contains request data
    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
            Authorization: `Basic ${encodedCreds}`,
        },
    };
    //function cB response
    function cb(response) {
        if (response.statusCode != 200) {
            // log to see if something went wrong
            console.log("something went wrong");
            callback(response.statusCode);
        }
        //adding the token chunks to the body
        let body = "";
        response.on("data", function (chunk) {
            body += chunk;
        });
        //parsing the chunk infomation in the now body
        response.on("end", function () {
            // console.log("body", body);
            const parsedBody = JSON.parse(body);
            // console.log("parsedBody", parsedBody);
            //first arg is always an error
            callback(null, parsedBody.access_token);
        });
    }

    const req = https.request(options, cb);
    req.end("grant_type=client_credentials");
};

//this function gets the tweets from twitter
module.exports.getTweets = (token, screen_name, callback) => {
    //creating GET options object that contains request data
    const options = {
        host: "api.twitter.com",
        path: `/1.1/statuses/user_timeline.json?screen_name=${screen_name}&tweet_mode=extended_entities`,
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    };
    // function callback response
    function cb(response) {
        if (response.statusCode != 200) {
            // log is something went wrong
            console.log("something went wrong");
            callback(response.statusCode);
        }
        //adding the tweet chunks to the body
        let body = "";
        response.on("data", function (chunk) {
            body += chunk;
            // console.log("body", body);
        });
        //parsing the tweet chunks infomation
        response.on("end", function () {
            const parsedTweets = JSON.parse(body);
            // console.log(parsedTweets);
            callback(null, parsedTweets);
        });
    }

    const req = https.request(options, cb);
    req.end();
};
//this function will tidy up the tweets
module.exports.filterTweets = (callback) => {
    const obj = callback;
    console.log(
        "This is the value of the call back object which will then be filtered: ",
        obj
    );
    let newArr = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].entities.urls.length === 1) {
            let newObj = {
                href: obj[i].entities.urls[0].url,
                text: obj[i].full_text,
                source: obj[i].source,
                name: obj[i].user.name,
                time: obj[i].created_at,
                // url: obj[i].,
            };
            newArr.push(newObj);
        }
    }
    return newArr;
};
