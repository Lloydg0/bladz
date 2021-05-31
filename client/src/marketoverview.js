import { useEffect } from "react";

export default function MarkerOverView() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src =
            "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js";
        script.async = true;

        script.innerHTML = JSON.stringify({
            colorTheme: "dark",
            dateRange: "12M",
            showChart: true,
            locale: "en",
            width: "400",
            height: "600",
            largeChartUrl: "",
            isTransparent: false,
            showSymbolLogo: true,
            plotLineColorGrowing: "rgba(25, 118, 210, 1)",
            plotLineColorFalling: "rgba(25, 118, 210, 1)",
            gridLineColor: "rgba(42, 46, 57, 1)",
            scaleFontColor: "rgba(120, 123, 134, 1)",
            belowLineFillColorGrowing: "rgba(33, 150, 243, 0.12)",
            belowLineFillColorFalling: "rgba(33, 150, 243, 0.12)",
            symbolActiveColor: "rgba(0, 0, 0, 0.12)",
            tabs: [
                {
                    title: "Indices",
                    symbols: [
                        {
                            s: "FOREXCOM:SPXUSD",
                            d: "S&P 500",
                        },
                        {
                            s: "FOREXCOM:NSXUSD",
                            d: "Nasdaq 100",
                        },
                        {
                            s: "FOREXCOM:DJI",
                            d: "Dow 30",
                        },
                        {
                            s: "INDEX:NKY",
                            d: "Nikkei 225",
                        },
                        {
                            s: "INDEX:DEU30",
                            d: "DAX Index",
                        },
                        {
                            s: "FOREXCOM:UKXGBP",
                            d: "UK 100",
                        },
                    ],
                    originalTitle: "Indices",
                },
                {
                    title: "Commodities",
                    symbols: [
                        {
                            s: "CME_MINI:ES1!",
                            d: "S&P 500",
                        },
                        {
                            s: "CME:6E1!",
                            d: "Euro",
                        },
                        {
                            s: "COMEX:GC1!",
                            d: "Gold",
                        },
                        {
                            s: "NYMEX:CL1!",
                            d: "Crude Oil",
                        },
                        {
                            s: "NYMEX:NG1!",
                            d: "Natural Gas",
                        },
                        {
                            s: "CBOT:ZC1!",
                            d: "Corn",
                        },
                    ],
                    originalTitle: "Commodities",
                },
                {
                    title: "Bonds",
                    symbols: [
                        {
                            s: "CME:GE1!",
                            d: "Eurodollar",
                        },
                        {
                            s: "CBOT:ZB1!",
                            d: "T-Bond",
                        },
                        {
                            s: "CBOT:UB1!",
                            d: "Ultra T-Bond",
                        },
                        {
                            s: "EUREX:FGBL1!",
                            d: "Euro Bund",
                        },
                        {
                            s: "EUREX:FBTP1!",
                            d: "Euro BTP",
                        },
                        {
                            s: "EUREX:FGBM1!",
                            d: "Euro BOBL",
                        },
                    ],
                    originalTitle: "Bonds",
                },
                {
                    title: "Forex",
                    symbols: [
                        {
                            s: "FX:EURUSD",
                        },
                        {
                            s: "FX:GBPUSD",
                        },
                        {
                            s: "FX:USDJPY",
                        },
                        {
                            s: "FX:USDCHF",
                        },
                        {
                            s: "FX:AUDUSD",
                        },
                        {
                            s: "FX:USDCAD",
                        },
                    ],
                    originalTitle: "Forex",
                },
            ],
        });

        document.getElementById("overviewContainer").appendChild(script);
    }, [
        "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
    ]);

    return (
        <>
            <div id="overviewContainer">
                <div className="tradingview-widget-container">
                    <div className="tradingview-widget-container__widget"></div>
                </div>
            </div>
        </>
    );
}
