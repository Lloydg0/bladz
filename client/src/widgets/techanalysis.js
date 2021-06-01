import { useEffect } from "react";

export default function TechAnalysis() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            interval: "1W",
            width: "100%",
            isTransparent: false,
            height: "100%",
            symbol: "BITPANDAPRO:BTCEUR",
            showIntervalTabs: true,
            locale: "en",
            colorTheme: "dark",
        });

        document.getElementById("widgetContainer").appendChild(script);
    }, [
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
    ]);

    return (
        <>
            <div id="widgetContainer">
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </>
    );
}
