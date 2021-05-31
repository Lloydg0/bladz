// const rp = require("request-promise");
const https = require("https");

module.exports.getCoins = () => {
    const requestOptions = {
        method: "GET",
        url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        qs: {
            start: "1",
            limit: "5000",
            convert: "EUR",
        },
        headers: {
            "X-CMC_PRO_API_KEY": "b54bcf4d-1bca-4e8e-9a24-22ff2c3d462c",
        },
        json: true,
        gzip: true,
    };

    function rp(response) {
        console.log("response", response);
        if (response.statusCode != 200) {
            console.log("something went wrong");
        }
        //adding the tweet chunks to the body
        // let body = "";
        // response.on("data", function (chunk) {
        //     body += chunk;
        //     console.log("body", body);
        // });
    }
    // rp(requestOptions)
    //     .then((response) => {
    //         console.log("API call response:", response);
    //     })
    //     .catch((err) => {
    //         console.log("API call error:", err.message);
    //     });

    const req = https.request(requestOptions, rp);
    req.end();
};
