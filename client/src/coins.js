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
                {coins &&
                    coins.map(
                        ({
                            id,
                            cmc_rank,
                            max_supply,
                            name,
                            symbol,
                            total_supply,
                        }) => {
                            return (
                                <div className="" key={id}>
                                    <div className="">
                                        <span className="">{cmc_rank}</span>
                                        <span className="">{symbol}</span>
                                        <span className="">{name}</span>
                                        <span className="">{max_supply}</span>
                                        <span className="">{total_supply}</span>
                                    </div>
                                </div>
                            );
                        }
                    )}
            </div>
        </>
    );
}

// quote[0]USD[0]market_cap, quote[0]USD[0]percent_change_24h, quote[0]USD[0]percent_change_1h, quote[0]USD[0]percent_change_7d, quote[0]USD[0]price, quote[0]USD[0]volume_24h
