import { useEffect } from "react";

export default function Ticker() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;

        script.onload = () => newTradingTicker();
        document.body.appendChild(script);
    }, [
        "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js",
    ]);

    const newTradingTicker = () => {
        let params = {
            symbols: [
                {
                    description: "BTC/EUR",
                    proName: "BITPANDAPRO:BTCEUR",
                },
                {
                    description: "ETH/EUR",
                    proName: "KRAKEN:ETHEUR",
                },
                {
                    description: "MATIC/EUR",
                    proName: "BINANCE:MATICEUR",
                },
                {
                    description: "XMR/EUR",
                    proName: "KRAKEN:XMREUR",
                },
                {
                    description: "ADA/EUR",
                    proName: "KRAKEN:ADAEUR",
                },
                {
                    description: "DOGE/EUR",
                    proName: "BITPANDAPRO:DOGEEUR",
                },
            ],
            showSymbolLogo: true,
            colorTheme: "dark",
            isTransparent: false,
            displayMode: "adaptive",
            locale: "en",
            container_id: "ticker_123",
        };
        return params;
    };

    return (
        <>
            <div className="tradingview-widget-container">
                <div
                    id="ticker_123"
                    className="tradingview-widget-container__widget"
                ></div>
                <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com" rel="noopener">
                        <span className="blue-text">Ticker Tape</span>
                    </a>{" "}
                    by TradingView
                </div>
            </div>
        </>
    );
}

// <div class="tradingview-widget-container">
//   <div class="tradingview-widget-container__widget"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com" rel="noopener" target="_blank"><span class="blue-text">Ticker Tape</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js" async>
//   {
//   "symbols": [
//     {
//       "description": "BTC/EUR",
//       "proName": "BITPANDAPRO:BTCEUR"
//     },
//     {
//       "description": "ETH/EUR",
//       "proName": "KRAKEN:ETHEUR"
//     },
//     {
//       "description": "MATIC/EUR",
//       "proName": "BINANCE:MATICEUR"
//     },
//     {
//       "description": "XMR/EUR",
//       "proName": "KRAKEN:XMREUR"
//     },
//     {
//       "description": "ADA/EUR",
//       "proName": "KRAKEN:ADAEUR"
//     },
//     {
//       "description": "DOGE/EUR",
//       "proName": "BITPANDAPRO:DOGEEUR"
//     }
//   ],
//   "showSymbolLogo": true,
//   "colorTheme": "dark",
//   "isTransparent": false,
//   "displayMode": "adaptive",
//   "locale": "en"
// }
//   </script>
// </div>
