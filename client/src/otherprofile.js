import React from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import Wall from "./wall";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            imgURL: "",
            finishedBio: "",
        };
    }
    async componentDidMount() {
        console.log("The other users profile mounted");
        const otherUserId = this.props.match.params.id;
        console.log("otherUserid", otherUserId.length);

        try {
            const response = await axios.post(
                "/users/" + this.props.match.params.id
            );

            if (otherUserId == response.data.user) {
                this.props.history.push("/");
            } else {
                this.setState({
                    first_name: response.data.payload[0].first_name,
                    last_name: response.data.payload[0].last_name,
                    imgURL: response.data.payload[0].url,
                    finishedBio: response.data.payload[0].bio,
                });
            }

            // if (otherUserId > otherUserId[otherUserId.length - 1]) {
            //     this.props.history.push("/");
            // }
        } catch (err) {
            console.log("Error in axios for other profile", err);
        }
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
                    </div>
                    <div className="userprofile-information-container">
                        <h2>{this.state.first_name}</h2>
                        <h2>{this.state.last_name}</h2>
                        <h2>{this.state.finishedBio}</h2>
                    </div>
                    <FriendButton id={this.props.match.params.id} />
                    <Wall />
                </div>
            </>
        );
    }
}
