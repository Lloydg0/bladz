import axios from "./axios";
import { useState, useEffect } from "react";

export default function BlockChain() {
    const [gasPrice, setgasPrice] = useState([]);
    const [tradeData, settradeData] = useState([]);

    const { FastGasPrice, LastBlock, ProposeGasPrice, SafeGasPrice } = gasPrice;

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/gasprice").catch(console.log);
            let newGasData = data.payload;
            setgasPrice(newGasData);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const { data } = await axios.get("/tradedata").catch(console.log);
            settradeData(data);
        })();
    }, []);
    return (
        <>
            <div className="live-trades-heading-container">
                <h1 className="live-trades-heading">Live Trades</h1>
            </div>
            <div className="gas-prices">
                Latest Gas Prices:
                <span className="gas-prices-gwei">
                    Fast Gas Price - {FastGasPrice} GWEI
                </span>
                <span className="gas-prices-gwei">
                    Proposed Gas Price - {ProposeGasPrice} GWEI
                </span>
                <span className="gas-prices-gwei">
                    Safe Gas Price - {SafeGasPrice} GWEI
                </span>
                <span className="gas-prices-gwei">
                    Last Block - {LastBlock}
                </span>
            </div>

            <div className="live-trades-main-container">
                <h3 className="live-trade-heading">Latest Transations</h3>
                <div className="livetrade-bar-heading">
                    <span className="live-symbol">Symbol</span>
                    <span className="live-hash">Hash</span>
                    <span className="live-amount-coin">Amount</span>
                    <span className="live-amount-fiat">Amount (EUR)</span>
                    <span className="live-position">Position</span>
                    <span className="live-time">Time</span>
                </div>

                <div className="transaction-line-container">
                    <div className="transaction-line-position">
                        {tradeData.payload &&
                            tradeData.payload.map(
                                ({
                                    price,
                                    size,
                                    symbol_id,
                                    time_exchange,
                                    uuid,
                                    taker_side,
                                }) => {
                                    let uuidShort = uuid
                                        .toString()
                                        .slice(0, 15);

                                    let date = new Date(time_exchange);
                                    let formattedDate = new Intl.DateTimeFormat(
                                        "en-GB",
                                        {
                                            dateStyle: "long",
                                            timeStyle: "short",
                                        }
                                    ).format(date);

                                    let position =
                                        "individual-transaction " +
                                        (taker_side === "BUY" ||
                                        taker_side === "BUY_ESTIMATED"
                                            ? "green"
                                            : "red");

                                    return (
                                        <>
                                            <div
                                                className="transaction-line"
                                                key={uuid}
                                            >
                                                <span className="individual-transaction symbol">
                                                    {symbol_id}
                                                </span>
                                                <span className="individual-transaction uuid">
                                                    {uuidShort}...
                                                </span>
                                                <span className="individual-transaction transaction-coin amount-coin">
                                                    {size}
                                                </span>
                                                <span className="individual-transaction tranaction-price amount-euro">
                                                    {price}
                                                </span>
                                                <span
                                                    className={position}
                                                    id="live-position"
                                                >
                                                    {taker_side}
                                                </span>
                                                <span className="individual-transaction live-transaction-date">
                                                    {formattedDate}
                                                </span>
                                            </div>
                                        </>
                                    );
                                }
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
