export default function Navbar() {
    return (
        <>
            <a
                href="javascript: false"
                onClick={(e) => {
                    e.preventDefault();
                    location.replace("/find/user");
                }}
                className="navbar-links"
            >
                Search
            </a>
            <a
                href="javascript: false"
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
