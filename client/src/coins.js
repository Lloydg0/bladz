import axios from "./axios";
import { useState, useEffect } from "react";

export default function Coins() {
    console.log("coins just mounted");

    const [coins, setCoins] = useState([]);

    console.log("coins", coins);

    useEffect(() => {
        console.log("useEffect for coins just ran");

        (async () => {
            const { data } = await axios.get("/coins").catch(console.log);
            setCoins(data);
        })();
    }, []);
    return (
        <>
            <h1 className="coin-heading">Cryptocurrency Market</h1>
            <div className="coin-container">
                <div className="coin-bar-heading">
                    <span className="coin-heading-colums rank-heading">#</span>
                    <span className="coin-heading-colums name-heading">
                        Name
                    </span>
                    <span className="coin-heading-colums price-heading">
                        Price(€)
                    </span>
                    <span className="coin-heading-colums day-heading">
                        24h %
                    </span>
                    <span className="coin-heading-colums sevenday-heading">
                        7d %
                    </span>
                    <span className="coin-heading-colums mc-heading">
                        Market Cap
                    </span>
                    <span className="coin-heading-colums vol-heading">
                        Volume (24h)
                    </span>
                    <span className="coin-heading-colums supply-heading">
                        Circulating Supply
                    </span>
                </div>
                <div className="coin-list-position">
                    {coins.payload &&
                        coins.payload.map(
                            ({
                                id,
                                cmc_rank,
                                max_supply,
                                name,
                                symbol,
                                quote,
                            }) => {
                                let price = quote.USD.price
                                    .toString()
                                    .slice(0, 8);
                                let twentyfourhourchange =
                                    quote.USD.percent_change_24h
                                        .toString()
                                        .slice(0, 5);
                                let sevendaychange = quote.USD.percent_change_7d
                                    .toString()
                                    .slice(0, 5);
                                let market_cap = quote.USD.market_cap
                                    .toString()
                                    .slice(0, 14);
                                let volume = quote.USD.volume_24h
                                    .toString()
                                    .slice(0, 13);

                                let twentyfourhourprecentagechange =
                                    "individual-coin day " +
                                    (twentyfourhourchange >= 0
                                        ? "green"
                                        : "red");
                                let sevendayprecentagechange =
                                    "individual-coin day " +
                                    (sevendaychange >= 0 ? "green" : "red");
                                return (
                                    <>
                                        <div key={id}>
                                            <div className="coin-line" key={id}>
                                                <span className="individual-coin rank">
                                                    {cmc_rank}
                                                </span>
                                                <span className="individual-coin name">
                                                    {name} ({symbol})
                                                </span>
                                                <span className="individual-coin price">
                                                    {price}
                                                </span>
                                                <span
                                                    className={
                                                        twentyfourhourprecentagechange
                                                    }
                                                >
                                                    {twentyfourhourchange}
                                                </span>
                                                <span
                                                    className={
                                                        sevendayprecentagechange
                                                    }
                                                >
                                                    {sevendaychange}
                                                </span>
                                                <span className="individual-coin mc">
                                                    {market_cap}
                                                </span>
                                                <span className="individual-coin vol">
                                                    {volume}
                                                </span>
                                                <span className="individual-coin supply">
                                                    {max_supply}
                                                </span>
                                            </div>
                                        </div>
                                    </>
                                );
                            }
                        )}
                </div>
            </div>
        </>
    );
}
