// const Chart = r equire("./charts.html");

// export default function Charts() {
//     return (
//         <>
//             <Chart />
//         </>
//     );
// }

// import { useEffect } from "react";

// export default function Charts() {
//     useEffect(() => {
//         const script = document.createElement("script");
//         script.src = "https://s3.tradingview.com/tv.j";
//         script.async = true;
//         script.innerHTML = `new TradingView.widget(
//   {
//   "width": 980,
//   "height": 610,
//   "symbol": "BITPANDAPRO:BTCEUR",
//   "interval": "D",
//   "timezone": "Etc/UTC",
//   "theme": "dark",
//   "style": "1",
//   "locale": "en",
//   "toolbar_bg": "#f1f3f6",
//   "enable_publishing": false,
//   "allow_symbol_change": true,
//   "container_id": "tradingview_3ee3f"
// }
//   )`;

//         document.body.appendChild(script);
//     }, ["https://s3.tradingview.com/tv.j"]);
//     return (
//         <>
//             <div className="tradingview-widget-container">
//                 <div id="tradingview_578cf"></div>
//                 <div className="tradingview-widget-copyright">
//                     <a
//                         href="https://www.tradingview.com/symbols/BTCEUR/?exchange=BITPANDAPRO"
//                         rel="noopener"
//                         // target="_blank"
//                     >
//                         <span className="blue-text">AAPL Chart</span>
//                     </a>
//                     by TradingView
//                 </div>
//             </div>
//         </>
//     );
// }

// <!-- TradingView Widget BEGIN -->
// <div class="tradingview-widget-container">
//   <div id="tradingview_3ee3f"></div>
//   <div class="tradingview-widget-copyright"><a href="https://www.tradingview.com/symbols/BTCEUR/?exchange=BITPANDAPRO" rel="noopener" target="_blank"><span class="blue-text">BTCEUR Chart</span></a> by TradingView</div>
//   <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
//   <script type="text/javascript">
//   </script>
// </div>
// <!-- TradingView Widget END -->
