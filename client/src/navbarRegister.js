import { HashRouter, Link } from "react-router-dom";

export default function NavbarRegister() {
    return (
        <>
            <div className="navbar-links-on-register">
                <HashRouter>
                    <Link className="login-button-navbar-register" to="/">
                        Register
                    </Link>
                    <Link className="login-button-navbar-register" to="/login">
                        Log In
                    </Link>
                </HashRouter>
            </div>
        </>
    );
}
