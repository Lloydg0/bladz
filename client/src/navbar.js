import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <Link className="navbar-links" to="/friends-wannabees">
                Friends
            </Link>
            <Link className="navbar-links" to="/find/user">
                Search
            </Link>
            <Link className="navbar-links" to="/">
                Profile
            </Link>
            <Link className="navbar-links" to="/logout">
                Log Out
            </Link>
        </>
    );
}
