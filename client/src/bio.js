import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showTextArea: false,
            draftBio: "",
        };
    }

    handleBioChange({ target }) {
        this.setState({
            draftBio: target.value,
        });
        console.log("Form Data added to bio", target.value);
    }

    SendingbackBio(newBio) {
        this.props.setBio(newBio);
    }

    submitbio(e) {
        e.preventDefault();
        //get bio from bio editors state send it along with request
        const { draftBio } = this.state;
        console.log("draftBio", draftBio);
        console.log("click");
        //make axios post request with new bio when save is pressed
        axios
            .post("/bio", {
                draftBio,
            })
            .then((response) => {
                const newBio = response.data.payload[0].bio;
                console.log("newBio: ", newBio);
                this.SendingbackBio(newBio);
            })
            .catch((err) => {
                console.log(
                    "Error in axios post request on registation form component",
                    err
                );
            });

        // store uses bio in DB (add new row in table & create query)
        // set the new bio you just send back in the state of home
        // home state offical bio
        // bio editor is a grand child of home
        // invoke setBio from home here (NEEDS TO BE PASSED FROM HOME TO PROFILE TO BIOEDITOR)
        // this.props.setBio(draftBio);
    }

    toggleBio(e) {
        e.preventDefault();
        console.log("you want to hide or show the text area");
        this.setState({
            showTextArea: !this.state.showTextArea,
        });
    }

    render() {
        return (
            <>
                {!this.state.showTextArea &&
                    (this.state.draftBio ? (
                        <button
                            onClick={(e) => this.toggleBio(e)}
                            className="save-button"
                        >
                            Edit Bio
                        </button>
                    ) : (
                        <button
                            onClick={(e) => this.toggleBio(e)}
                            className="save-button"
                        >
                            Add Bio
                        </button>
                    ))}

                {this.state.showTextArea && (
                    <>
                        <textarea
                            onChange={(e) => this.handleBioChange(e)}
                            defaultValue={this.state.draftBio}
                        ></textarea>
                        <button
                            className="save-button"
                            onClick={(e) => this.submitbio(e)}
                        >
                            Save Bio
                        </button>
                        <button
                            className="save-button"
                            onClick={(e) => this.toggleBio(e)}
                        >
                            Close
                        </button>
                    </>
                )}
            </>
        );
    }
}
