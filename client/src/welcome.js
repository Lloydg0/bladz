import NavbarRegister from "./navbarRegister";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./resistration";
import Login from "./login";
import ResetPassword from "./reset";

export default function Welcome() {
    return (
        <div className="main-page-main-container">
            <div className="main-page-left-container">
                <div className="left-side-top">
                    <div className="main-text">
                        <h1>Bladz</h1>
                        <h3>lorem lorem lorem</h3>
                    </div>
                </div>
                <div className="left-side-bottom">
                    <HashRouter>
                        <div>
                            <Route exact path="/" component={Registration} />
                            <Route path="/login" component={Login} />
                            <Route
                                path="/password-reset"
                                component={ResetPassword}
                            />
                        </div>
                    </HashRouter>
                </div>
            </div>
            <div className="main-page-right-container">
                <NavbarRegister />
                <img className="mainimg" src="/mainimg.png" />
            </div>
        </div>
    );
}
