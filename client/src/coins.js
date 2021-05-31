import axios from "./axios";
import { useState, useEffect } from "react";

export default function Coins() {
    console.log("coins just mounted");
    const [coins, setCoins] = useState([]);
    console.log("news items", coins);
    useEffect(() => {
        console.log("useEffect for coins just ran");
        (async () => {
            const { data } = await axios.get("/coins").catch(console.log);
            setCoins(data);
        })();
    }, []);
    return (
        <>
            <h1>Coin Prices</h1>
        </>
    );
}
