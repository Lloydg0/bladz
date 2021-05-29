import { Link } from "react-router-dom";
export default function Navbar() {
    return (
        <>
            <Link className="navbar-links" to="/charts">
                <img className="icon" src="./discussion.png"></img>
                charts
            </Link>
            <Link className="navbar-links" to="/chat">
                <img className="icon" src="./discussion.png"></img>
                Discussion Board
            </Link>
            <Link className="navbar-links" to="/marketnews">
                <img className="icon" src="./newspaper.png"></img>
                News
            </Link>
            <Link className="navbar-links" to="/friends-wannabees">
                <img className="icon" src="./friends.png"></img>
                Friends
            </Link>
            <Link className="navbar-links" to="/find/user">
                <img className="icon" src="./search.png"></img>
                Search
            </Link>
            <Link className="navbar-links" to="/">
                <img className="icon" src="./profile.png"></img>
                Profile
            </Link>
            <img className="icon" src="./arrow.png"></img>
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
