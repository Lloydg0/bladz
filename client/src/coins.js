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
            <h1 className="coin-heading">Coin Prices</h1>
            <div className="coin-container">
                <div className="coin-bar-heading">
                    <span className="coin-heading-colums rank-heading">#</span>
                    <span className="coin-heading-colums name-heading">
                        Name
                    </span>
                    <span className="coin-heading-colums price-heading">
                        Price
                    </span>
                    <span className="coin-heading-colums day-heading">
                        24h %
                    </span>
                    <span className="coin-heading-colums sevenday-heading">
                        7d &
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
                                return (
                                    <>
                                        <div>
                                            <div className="coin-line" key={id}>
                                                <span className="individual-coin rank">
                                                    {cmc_rank}
                                                </span>
                                                <span className="individual-coin name">
                                                    {name} ({symbol})
                                                </span>
                                                <span className="individual-coin price">
                                                    {quote.USD.price}
                                                </span>
                                                <span className="individual-coin day">
                                                    {
                                                        quote.USD
                                                            .percent_change_24h
                                                    }
                                                </span>
                                                <span className="individual-coin sevenday">
                                                    {
                                                        quote.USD
                                                            .percent_change_7d
                                                    }
                                                </span>
                                                <span className="individual-coin mc">
                                                    {quote.USD.market_cap}
                                                </span>
                                                <span className="individual-coin vol">
                                                    {quote.USD.volume_24h}
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
