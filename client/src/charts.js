import { useEffect } from "react";
import Ticker from "./ticker";
import TechAnalysis from "./techanalysis";
import MarketOverView from "./marketoverview";

export default function Charts() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src = "https://s3.tradingview.com/tv.js";
        script.async = true;

        script.onload = () => newTradingViewWidget();
        document.body.appendChild(script);
    }, ["https://s3.tradingview.com/tv.js"]);

    const newTradingViewWidget = () => {
        let params = {
            autosize: true,
            symbol: "BITPANDAPRO:BTCEUR",
            interval: "D",
            timezone: "Etc/UTC",
            theme: "dark",
            style: "1",
            locale: "en",
            toolbar_bg: "#f1f3f6",
            enable_publishing: false,
            hide_side_toolbar: false,
            allow_symbol_change: true,
            container_id: "tradingview_aaa66",
        };
        new TradingView.widget(params);
    };

    return (
        <>
            <Ticker />
            <div className="all-widgets-container">
                <div className="tradingview-widget-container">
                    <div
                        className="graph-container"
                        id="tradingview_aaa66"
                    ></div>
                </div>
            </div>
            <TechAnalysis />
            {/* <MarketOverView /> */}
        </>
    );
}
