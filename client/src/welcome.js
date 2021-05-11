import NavbarRegister from "./navbarRegister";
// import mainLogo from "../public/logo.png";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./resistration";
import Login from "./login";
import ResetPassword from "./reset";

// can be a function
export default function Welcome() {
    return (
        <div className="main-page-main-container">
            <div className="main-page-left-container">
                <div className="left-side-top">
                    <div className="main-text">
                        <h1>Welcome to the Social</h1>
                        <h3>
                            blah blah blah blahblah blahblah blahblah blahblah
                            blah blah blah blah blah blah blah blah blah blah
                            blah blah blah blah blah blah blah blah blah blah
                            blah blah blah blah blah blah blah blah blah blah
                            blah
                        </h3>
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
                <img src="/logo.png" />
                <div className="circle-container">
                    <div className="circle1">
                        <div className="circle2">
                            <div className="circle3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
