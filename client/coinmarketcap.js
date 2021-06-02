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
            return response;
        })
        .catch((err) => {
            console.log("error in getting coin", err);
        });
};

module.exports.getGasPrice = () => {
    return axios({
        method: "GET",
        url: `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${secrets.ether_scan}`,
    })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log("error in getting blockChain", err);
        });
};

module.exports.TradeData = () => {
    return axios({
        method: "GET",
        url: `	https://rest.coinapi.io/v1/trades/latest?limit=50&symbol_id=BITSTAMP_SPOT_BTC_EUR`,
        headers: {
            "X-CoinAPI-Key": `${secrets.coinapi_secret}`,
        },
    })
        .then((response) => {
            return response;
        })
        .catch((err) => {
            console.log("error in getting livetransactions", err);
        });
};
