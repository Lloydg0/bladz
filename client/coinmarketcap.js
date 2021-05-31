const axios = require("axios");
const secrets = require("../secrets.json");

module.exports.getCoins = () => {
    return axios({
        method: "GET",
        url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
        qs: {
            start: "1",
            limit: "100",
            convert: "EUR",
        },
        headers: {
            "X-CMC_PRO_API_KEY": `${secrets.CMC_Secret}`,
        },
        json: true,
        gzip: true,
    })
        .then((response) => {
            console.log(
                "response in axios on getCoins function",
                response.data
            );
            return response;
        })
        .catch((err) => {
            console.log("error in getting coin", err);
        });
};
