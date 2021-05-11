import React from "react";
// import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }
    componentDidMount() {
        console.log("Uploader just mounted");
        console.log("props in Uploader", this.props);
    }
    methodInUploader() {
        this.props.toggleUploader();
    }
    methodToSubmitNewProfileImage() {
        this.props.submitImage(this.state.file);
    }
    render() {
        return (
            <>
                <div className="upload-modal-housing">
                    <div className="upload-modal-cover">
                        <div className="upload-modal-container">
                            <div className="upload-form">
                                <label
                                    htmlFor="files"
                                    className="choose-file-button"
                                >
                                    Choose a file
                                </label>
                                <button
                                    onClick={(e) =>
                                        this.methodToSubmitNewProfileImage(e)
                                    }
                                    className="upload-button"
                                >
                                    Upload
                                </button>
                                <label
                                    onClick={() => this.methodInUploader()}
                                    className="finished-button"
                                >
                                    Close
                                </label>
                                <input
                                    onChange={(e) =>
                                        this.setState({
                                            file: e.target.files[0],
                                        })
                                    }
                                    id="files"
                                    type="file"
                                    name="file"
                                    accept="image/*"
                                />
                                <input
                                    type="hidden"
                                    name="_csrf"
                                    value="{{csrfToken}}"
                                ></input>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
