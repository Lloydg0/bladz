import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <Link className="navbar-links" to="/Routes">
                Routes
            </Link>
            <Link className="navbar-links" to="/chat">
                Chat
            </Link>
            <Link className="navbar-links" to="/friends-wannabees">
                Friends
            </Link>
            <Link className="navbar-links" to="/find/user">
                Search
            </Link>
            <Link className="navbar-links" to="/">
                Profile
            </Link>
            <a
                className="navbar-links"
                onClick={() => {
                    window.location.href = "/logout";
                }}
            >
                Log Out
            </a>
        </>
    );
}
