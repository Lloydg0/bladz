import { useEffect } from "react";

export default function TechAnalysis() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            interval: "1m",
            width: "425",
            isTransparent: false,
            height: "450",
            symbol: "BITPANDAPRO:BTCEUR",
            showIntervalTabs: true,
            locale: "en",
            colorTheme: "dark",
            id: "tech_analysis_123",
        });

        document.body.appendChild(script);
    }, [
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
    ]);

    return (
        <>
            <div className="tech-analysis">
                <div className="tradingview-widget-container">
                    <div
                        id="tech_analysis_123"
                        className="tradingview-widget-container__widget"
                    ></div>
                    {/* <div className="tradingview-widget-copyright">
                        <a
                            href="https://www.tradingview.com/symbols/BTCEUR/technicals/"
                            rel="noopener"
                        >
                            <span className="blue-text">
                                Technical Analysis for BTCEUR
                            </span>
                        </a>
                        by TradingView
                    </div> */}
                </div>
            </div>
        </>
    );
}
