import { useEffect } from "react";

export default function MiniBtc() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            symbol: "BITPANDAPRO:BTCEUR",
            width: "100%",
            height: "100%",
            locale: "en",
            dateRange: "12M",
            colorTheme: "dark",
            trendLineColor: "#37a6ef",
            underLineColor: "rgba(55, 166, 239, 0.15)",
            isTransparent: false,
            autosize: true,
            largeChartUrl: "",
        });
        document.getElementById("minibtc").appendChild(script);
    }, []);

    return (
        <>
            <div id="minibtc">
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </>
    );
}
