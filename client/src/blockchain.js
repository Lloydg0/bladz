import axios from "./axios";
import { useState, useEffect } from "react";

export default function BlockChain() {
    console.log("coins just mounted");
    const [gasPrice, setgasPrice] = useState([]);
    const [transaction, setTransaction] = useState([]);

    console.log("gasPrice", gasPrice.payload);
    console.log("transaction", transaction);
    // const { FastGasPrice } = gasPrice.payload;
    // let FastGasPrice = gasPrice.payload.FastGasPrice;
    // let LastBlock = gasPrice.payload.LastBlock;
    // let ProposedGasPrice = gasPrice.payload.ProposedGasPrice;
    // let SafeGasPrice = gasPrice.payload.SafeGasPrice;
    // console.log(
    //     "gasPriceData",
    //     FastGasPrice,
    //     LastBlock,
    //     ProposedGasPrice,
    //     SafeGasPrice
    // );

    useEffect(() => {
        console.log("useEffect for gasprice just ran");

        (async () => {
            const { data } = await axios.get("/gasprice").catch(console.log);
            setgasPrice(data);
        })();
    }, []);

    useEffect(() => {
        console.log("useEffect for for mock transaction History just ran");

        (async () => {
            const { data } = await axios
                .get("/livetransactions")
                .catch(console.log);
            setTransaction(data);
        })();
    }, []);
    return (
        <>
            <div className="live-trades-heading-container">
                <h1 className="live-trades-heading">Live Trades</h1>
            </div>
            <div className="gasprices">
                Latest Gas Prices -
                {/* <span>Fast Gas Price - {FastGasPrice} GWEI</span>
            <span>Proposed Gas Price - {ProposedGasPrice} GWEI</span>
            <span>Safe Gas Price - {SafeGasPrice} GWEI</span>
            <span>Last Block - {LastBlock} GWEI</span> */}
            </div>

            <div className="live-trades-main-container">
                <h3 className="live-trade-heading">Latest BTC Transations</h3>
                <div className="livetrade-bar-heading">
                    <span className="live-hash">Hash</span>
                    <span className="live-amount-coin">Amount (BTC)</span>
                    <span className="live-amount-fiat">Amount (EUR)</span>
                </div>
                <div className="transaction-line-position">
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            0d23cd28a380974fa0db12da05226e1a87e80ba91...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.03933694 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €1,463.19
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            bf0697225160b8feeba3f72b798e54177bcf7edf1a2...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.00641452 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €238.18
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            16ba9ef78c0fa20a532e10f8bd30d3251a148fabe2i...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.00463761 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €172.08
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            344066204fafd94afd7599b3e22100257a8cab0d31...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.02279919 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €849.60
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            78f37be62523513209b0c5636a18c8fc541ba9cc51...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.21497741 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €8,010.85
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            1388dc8ba0d5e0a6ce53c2ba91d88cd22dc4d0840...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.04352452 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €1,616.20
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            409b7028c6ad09069fa00e25f719ci3a7e8bdbbee4...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.18335000 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €6,830.47
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            0c5fe2ea05f01ce4d4032ff80a5ai834779eac4a9d4...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.07920934 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €2,949.22
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            0845188e5951abd3b56a742b31073355b57079b0...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.11655868 BTC
                        </span>
                        <span className="individual-transaction tranaction-price">
                            €4,336.89
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            25f49b320ca9ace378ba4di19fc1950wd82025891...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            146.92366460 BTC
                        </span>
                        <span className="individual-transaction tranaction-price mil">
                            €5,478,380.29
                        </span>
                    </div>
                    <div className="transaction-line">
                        <span className="individual-transaction">
                            1e2e7b0efe1ee01d799bb93451d5cbdie1f56cf805...
                        </span>
                        <span className="individual-transaction transaction-coin">
                            0.62169432 BTC
                        </span>
                        <span className="individual-transaction tranaction-price ">
                            €23,177.92
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
}
