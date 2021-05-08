export default function Navbar() {
    return (
        <nav className="main-navbar">
            <div className="navbar-image">
                <h1>Home Page</h1>
                {/* <img src="" alt="" /> */}
            </div>
            <div className="navbar-links">
                <button className="login-button-navbar">Log In</button>
                <button className="register-button-navbar">Sign Up</button>
            </div>
        </nav>
    );
}
