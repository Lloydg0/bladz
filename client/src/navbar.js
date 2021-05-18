export default function Navbar() {
    return (
        <>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    location.replace("/find/user");
                }}
                className="navbar-links"
            >
                Search
            </a>
            <a
                onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    location.replace("/");
                }}
                type="button"
                className="navbar-links"
            >
                Profile
            </a>
            <a className="navbar-links">Log Out</a>
        </>
    );
}
