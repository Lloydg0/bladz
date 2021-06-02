import { Link } from "react-router-dom";

export default function Navbar({
    first_name,
    last_name,
    imgURL,
    toggleUploader,
}) {
    return (
        <>
            <div className="complete-navbar">
                <div className="profile-pic-container">
                    <img
                        onClick={() => toggleUploader()}
                        className="profile-pic"
                        src={imgURL || "/defaultIcon.jpeg"}
                        alt={first_name + " " + last_name}
                    />
                    <Link className="navbar-links-name" to="/">
                        {first_name} {last_name}
                    </Link>
                </div>
                <div className="sidenav-container">
                    <div className="sidenav-positioning">
                        <Link className="navbar-links" to="/charts">
                            <img className="icon" src="./chart.png"></img>
                            Dashboard
                        </Link>
                        <Link className="navbar-links" to="/coinsinfo">
                            <img className="icon" src="./price.png"></img>
                            Coins
                        </Link>
                        <Link className="navbar-links" to="/livetradesinfo">
                            <img className="icon" src="./live.png"></img>
                            Live Trades
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
                        {/* <Link className="navbar-links" to="/">
                            <img className="icon" src="./profile.png"></img>
                            Profile
                        </Link> */}
                        <a
                            className="navbar-links"
                            onClick={() => {
                                window.location.href = "/logout";
                            }}
                        >
                            <img className="icon" src="./arrow.png"></img>
                            Log Out
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
