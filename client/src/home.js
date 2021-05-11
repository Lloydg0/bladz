import React from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            imgURL: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        console.log("Home just mounted");
    }

    submitImage(file) {
        console.log("e in submitFile is running");
        var formData = new FormData();
        formData.append("file", file);
        axios
            .post("/upload", formData)
            .then((response) => {
                console.log("response data", response.data.payload[0]);
                this.setState({
                    first_name: response.data.payload[0].first_name,
                    last_name: response.data.payload[0].last_name,
                    imgURL: response.data.payload[0].url,
                });
            })
            .catch((err) => {
                console.log("err in POST/upload", err);
            });
    }

    toggleUploader() {
        console.log("you want to hide or show the uploader");
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <>
                <div className="main-navbar">
                    <img className="navbar-image" src="/logo.png" />
                    <div className="profile-pic-container">
                        <Profilepic
                            toggleUploader={() => this.toggleUploader()}
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            imgURL={this.state.imgURL}
                        />
                    </div>
                </div>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        toggleUploader={() => this.toggleUploader()}
                        submitImage={(e) => this.submitImage(e)}
                        handleChangeOnForm={(e) => this.handleChangeOnForm(e)}
                    />
                )}
            </>
        );
    }
}
