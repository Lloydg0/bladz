import Navbar from "./navbar";
import Registration from "./resistration";
import NavbarRegister from "./navbarRegister";
// import mainLogo from "../public/logo.png";

// can be a function
export default function Welcome() {
    return (
        <div className="main-page-main-container">
            <div className="main-page-left-container">
                <div className="left-side-top">
                    <div className="main-text">
                        <h1>Welcome to the Social</h1>
                        <h3>
                            blah blah blah blahblah blahblah blahblah blahblah
                            blah blah blah blah blah blah blah blah blah blah
                            blah blah blah blah blah blah blah blah blah blah
                            blah blah blah blah blah blah blah blah blah blah
                            blah
                        </h3>
                        <h4>Sign up Below</h4>
                    </div>
                </div>
                <div className="left-side-bottom">
                    <Registration />
                </div>
            </div>
            <div className="main-page-right-container">
                <NavbarRegister />
                <div className="circle-container">
                    <div className="circle1">
                        <div className="circle2">
                            <div className="circle3"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
