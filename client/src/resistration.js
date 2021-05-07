import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.name,
        };
    }
    submit() {
        axios
            .post("/welcome", {
                first_name: this.state.first,
                last_name: this.state.last,
                email: this.state.email,
                password_hash: this.state.password,
            })
            .then((response) => {
                console.log(
                    "Response worked in axios post for registration route",
                    response
                );
                if (response.success) {
                    // unload the page and request to the server
                    // location.href = "/";
                    location.replace("/");
                } else {
                    // sending error message if something is wrong with the form
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
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value,
        });
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
                            name="first_name"
                            placeholder="First Name"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="first.last@email.com"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.handleChange(e)}
                        />
                        <button
                            className="register-button"
                            onClick={() => this.submit}
                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
