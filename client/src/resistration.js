import React from "react";
import axios from "./axios";
import NavbarRegister from "./navbarRegister";

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
        axios
            .post("/registration", {
                first_name,
                last_name,
                email,
                password,
            })
            .then((response) => {
                if (response.data.success === true) {
                    location.replace("/home");
                } else {
                    this.setState({
                        error: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }
    handleChangeOnForm({ target }) {
        this.setState({
            [target.name]: target.value,
        });
    }
    render() {
        return (
            <>
                <div className="form-box">
                    <div className="form-content">
                        {this.state.error && (
                            <div className="error">Something went Wrong!</div>
                        )}
                        <input
                            name="first_name"
                            placeholder="First Name"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="last_name"
                            placeholder="Last Name"
                            required
                            onChange={(e) => this.handleChangeOnForm(e)}
                        />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
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
                            onClick={(e) => this.submitForm(e)}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
                <NavbarRegister />
            </>
        );
    }
}
