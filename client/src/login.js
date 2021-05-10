import React from "react";
import axios from "./axios";
import { HashRouter, Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
        };
    }
    submitLogin(e) {
        e.preventDefault();
        const { email, password } = this.state;
        console.log("click");
        axios
            .post("/login", {
                email,
                password,
            })
            .then((response) => {
                console.log(
                    "Response worked in axios post for registration route",
                    response
                );
                if (response.data.success === true) {
                    location.replace("/home");
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
        console.log("Form Data added", target.value);
    }
    render() {
        return (
            <div className="form-container">
                <div className="form-box">
                    <div className="form-content">
                        {this.state.error && (
                            <div className="error">Something went Wrong!</div>
                        )}
                        <input
                            name="email"
                            type="email"
                            placeholder="first.last@email.com"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
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
                            onClick={(e) => this.submitLogin(e)}
                        >
                            Login
                        </button>
                        <HashRouter>
                            <Link
                                className="login-button-navbar"
                                to="/password-reset"
                            >
                                Forgot Password
                            </Link>
                        </HashRouter>
                    </div>
                </div>
            </div>
        );
    }
}
