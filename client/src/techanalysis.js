import { useEffect } from "react";

export default function TechAnalysis() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
        script.async = true;

        script.onload = () => newTechAnalysisWidget();
        document.body.appendChild(script);
    }, [
        "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",
    ]);

    const newTechAnalysisWidget = () => {
        let params = {
            interval: "1m",
            width: "100%",
            isTransparent: false,
            height: "100%",
            symbol: "COINBASE:BTCEUR",
            showIntervalTabs: true,
            locale: "en",
            colorTheme: "dark",
            container_id: "tech_analysis_123",
        };
        return params;
    };

    return (
        <>
            <div className="tradingview-widget-container">
                <div
                    id="tech_analysis_123"
                    className="tradingview-widget-container__widget"
                ></div>
                <div className="tradingview-widget-copyright">
                    <a
                        href="https://www.tradingview.com/symbols/BTCEUR/technicals/"
                        rel="noopener"
                    >
                        <span className="blue-text">
                            Technical Analysis for BTCEUR
                        </span>
                    </a>
                    by TradingView
                </div>
            </div>
        </>
    );
}

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCEUR/technicals/" rel="noopener" target="_blank"><span class="blue-text">Technical Analysis for BTCEUR</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js" async>
//   {
//   "interval": "1m",
//   "width": "100%",
//   "isTransparent": false,
//   "height": "100%",
//   "symbol": "COINBASE:BTCEUR",
//   "showIntervalTabs": true,
//   "locale": "en",
//   "colorTheme": "dark"
// }
//   </script>
// </div>
// <!-- TradingView Widget END -->
