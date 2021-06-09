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
    }

    sendingBackBio(newBio) {
        this.props.setBio(newBio);
    }

    async submitbio(e) {
        e.preventDefault();
        const { draftBio } = this.state;
        const response = await axios
            .post("/bio", { draftBio })
            .catch(console.log);
        const newBio = response.data.payload[0].bio;
        this.sendingBackBio(newBio);
    }

    toggleBio(e) {
        e.preventDefault();
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
                            placeholder="Update Bio"
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
