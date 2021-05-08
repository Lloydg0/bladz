import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Home from "./home";

// we only called ReactDOM.render once in the whole project
// if (location.pathname == "/welcome") {
//     ReactDOM.render(<Welcome />, document.querySelector("main"));
// } else {
//     ReactDOM.render(<img src="logo.gif" />, document.querySelector("main"));
// }

let element = <Home />;

if (location.pathname == "/welcome") {
    element = <Welcome />;
}
ReactDOM.render(element, document.querySelector("main"));
