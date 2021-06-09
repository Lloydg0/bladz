import { HashRouter, Route } from "react-router-dom";
import Registration from "./resistration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <>
            <div className="main-page-main-container">
                <div className="inner-form-container">
                    <div className="inner-form-container-left">
                        <img className="mainimg" src="/mainimg.png" />
                    </div>
                    <div className="inner-form-container-right">
                        <HashRouter>
                            <div>
                                <Route
                                    exact
                                    path="/"
                                    component={Registration}
                                />
                                <Route path="/login" component={Login} />
                                <Route
                                    path="/password-reset"
                                    component={ResetPassword}
                                />
                            </div>
                        </HashRouter>
                    </div>
                </div>
            </div>
        </>
    );
}
