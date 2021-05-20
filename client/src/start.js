import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Home from "./home";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

// we only called ReactDOM.render once in the whole project
// if (location.pathname == "/welcome") {
//     ReactDOM.render(<Welcome />, document.querySelector("main"));
// } else {
//     ReactDOM.render(<img src="logo.gif" />, document.querySelector("main"));
// }

let element = (
    <Provider store={store}>
        <Home />
    </Provider>
);

if (location.pathname == "/welcome") {
    element = (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
}
ReactDOM.render(element, document.querySelector("main"));
