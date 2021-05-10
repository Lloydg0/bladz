import { HashRouter, Link } from "react-router-dom";
export default function Navbar() {
    return (
        <nav className="main-navbar">
            <div className="navbar-image">
                <h1>Home Page</h1>
                {/* <img src="" alt="" /> */}
            </div>
            <div className="navbar-links">
                {/* <HashRouter>
                    <Link className="login-button-navbar" to="/">
                        Do Somthing
                    </Link>
                    <Link className="register-button-navbar" to="/logout">
                        Log Out
                    </Link>
                </HashRouter> */}
                <button className="login-button-navbar">Do Something</button>
                <button className="register-button-navbar">Sign Out</button>
            </div>
        </nav>
    );
}
