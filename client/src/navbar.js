import { HashRouter, Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <HashRouter>
                <Link className="navbar-links" to="/">
                    Profile
                </Link>
                <Link className="navbar-links" to="/find/user">
                    Search Users
                </Link>
                <Link className="navbar-links" to="/logout">
                    Log Out
                </Link>
            </HashRouter>
        </>
    );
}
