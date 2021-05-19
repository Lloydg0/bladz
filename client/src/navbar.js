import { BrowserRouter, Link } from "react-router-dom";
export default function Navbar() {
    return (
        <BrowserRouter>
            <Link className="navbar-links" to="/find/user">
                Search
            </Link>
            <Link className="navbar-links" to="/">
                Profile
            </Link>
            <Link className="navbar-links" to="/logout">
                Log Out
            </Link>
        </BrowserRouter>
    );
}
