import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Home from "./home";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import reducer from "./reducer";
import { init } from "./socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

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
} else {
    init(store);
}
ReactDOM.render(element, document.querySelector("main"));
