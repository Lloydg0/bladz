import { useEffect } from "react";

export default function Ticker() {
    useEffect(() => {
        console.log("inside use effect");
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
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
        });
        document.body.appendChild(script);
    }, []);

    return (
        <>
            <div className="tradingview-widget-container">
                <div
                    id="ticker_123"
                    className="tradingview-widget-container__widget"
                ></div>
                {/* <div className="tradingview-widget-copyright">
                    <a href="https://www.tradingview.com" rel="noopener">
                        <span className="blue-text">Ticker Tape</span>
                    </a>{" "}
                    by TradingView
                </div> */}
            </div>
        </>
    );
}
