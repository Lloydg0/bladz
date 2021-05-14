import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            fimgURL: "",
            finishedBio: "",
        };
    }
    componentDidMount() {
        console.log("The other users profile mounted");
        axios
            .post("/users/:id", this.props.match.params.id)
            .then((response) => {
                console.log("response in other profile", response);
                this.setState({
                    first_name: response.data[0].first_name,
                    last_name: response.data[0].last_name,
                    fimgURL: response.data[0].imgURL,
                    finishedBio: response.data[0].finishedBio,
                });
            })
            .catch((err) => {
                console.log("Error in axios for other profile", err);
            });
    }
    render() {
        return (
            <>
                <div className="main-profile-container">
                    <div className="main-profile-image-container">
                        <img
                            className="main-profile-photo"
                            src={this.state.imgURL}
                        />
                        {/* <Profilepic /> */}
                    </div>
                    <div className="userprofile-information-container">
                        <h2>{this.state.first_name}</h2>
                        <h2>{this.state.last_name}</h2>
                        <h2>{this.state.finishedBio}</h2>
                    </div>
                </div>
            </>
        );
    }
}
