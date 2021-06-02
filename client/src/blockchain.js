import axios from "./axios";
import { useState, useEffect } from "react";

export default function BlockChain() {
    console.log("coins just mounted");
    const [gasPrice, setgasPrice] = useState([]);
    console.log("gasPrice", gasPrice.payload);
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
    return (
        <>
            <h1>Live Trades</h1>
            <div>
                Latest Gas Prices -
                {/* <span>Fast Gas Price - {FastGasPrice} GWEI</span>
            <span>Proposed Gas Price - {ProposedGasPrice} GWEI</span>
            <span>Safe Gas Price - {SafeGasPrice} GWEI</span>
            <span>Last Block - {LastBlock} GWEI</span> */}
            </div>
        </>
    );
}
