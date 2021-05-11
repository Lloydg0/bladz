import React from "react";
import axios from "./axios";
import { HashRouter, Link } from "react-router-dom";

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            code: "",
            view: 1,
        };
    }
    submitEmail(e) {
        e.preventDefault();
        const { email } = this.state;
        console.log("click");
        axios
            .post("/password/reset/email", {
                email,
            })
            .then((response) => {
                console.log(
                    "Response worked in axios post for registration route",
                    response
                );
                if (response.data.success === true) {
                    this.setState({
                        view: 2,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log(
                    "Error in axios post request on registation form component",
                    err
                );
            });
    }
    submitNewCodeAndPassword(e) {
        e.preventDefault();
        const { password, code } = this.state;
        axios
            .post("/password/reset/verify", {
                code,
                password,
            })
            .then((response) => {
                console.log(
                    "Response worked in axios post for registration route",
                    response
                );
                if (response.data.success === true) {
                    this.setState({
                        view: 3,
                    });
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log(
                    "Error in axios post request on registation form component",
                    err
                );
            });
    }
    handleChangeOnForm({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    determineViewToRender() {
        {
            if (this.state.view === 1) {
                return (
                    <>
                        <input
                            name="email"
                            type="email"
                            placeholder="first.last@email.com"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            type="hidden"
                            name="_csrf"
                            value="{{csrfToken}}"
                        ></input>
                        <button
                            className="register-button"
                            onClick={(e) => this.submitEmail(e)}
                        >
                            Send Verification Email
                        </button>
                    </>
                );
            } else if (this.state.view === 2) {
                return (
                    <>
                        <input
                            name="code"
                            key="code"
                            type="text"
                            placeholder="Please Enter Verification Code"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="password"
                            key="password"
                            type="password"
                            placeholder="Please Enter New Password"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            type="hidden"
                            name="_csrf"
                            value="{{csrfToken}}"
                        ></input>
                        <button
                            className="register-button"
                            onClick={(e) => this.submitNewCodeAndPassword(e)}
                        >
                            Submit Password Change
                        </button>
                    </>
                );
            } else if (this.state.view === 3) {
                return (
                    <>
                        <h5>Your Password was successfully updated!</h5>
                        <HashRouter>
                            <Link className="login-button-navbar" to="/login">
                                Return to Log In
                            </Link>
                        </HashRouter>
                    </>
                );
            }
        }
    }
    render() {
        return (
            <div className="form-container">
                <div className="form-box">
                    <div className="form-content">
                        {this.state.error && (
                            <div className="error">Something went Wrong!</div>
                        )}
                        {this.determineViewToRender()}
                    </div>
                </div>
            </div>
        );
    }
}
