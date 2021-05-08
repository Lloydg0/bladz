import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
        };
    }
    submitForm(e) {
        e.preventDefault();
        const { first_name, last_name, email, password } = this.state;
        console.log("click");
        axios
            .post("/registration", {
                first_name,
                last_name,
                email,
                password,
            })
            .then((response) => {
                console.log(
                    "Response worked in axios post for registration route",
                    response
                );
                if (response.data.success === true) {
                    // unload the page and request to the server
                    // location.href = "/";
                    location.replace("/home");
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
                            name="first_name"
                            placeholder="First Name"
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="first.last@email.com"
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            type="hidden"
                            name="_csrf"
                            value="{{csrfToken}}"
                        ></input>
                        <button
                            className="register-button"
                            onClick={(e) => this.submitForm(e)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
