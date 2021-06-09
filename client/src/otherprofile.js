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
            showPM: false,
        };
    }
    async componentDidMount() {
        const otherUserId = this.props.match.params.id;

        const response = await axios
            .post("/users/" + this.props.match.params.id)
            .catch(console.log);

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
    }

    togglePM(e) {
        e.preventDefault();
        this.setState({
            showPM: !this.state.showPM,
        });
    }

    render() {
        return (
            <>
                <div className=" user-profile-card">
                    <div className=" user-profile">
                        <img
                            className="user-profile-card-img"
                            src={this.state.imgURL}
                        />
                        <div className="user-profile-information-container">
                            <h3 className=" user-profile-card-name">
                                {this.state.first_name} {this.state.last_name}
                            </h3>
                            <div className=" user-profile-card-description-container">
                                <p className=" user-profile-card-description">
                                    {this.state.finishedBio}
                                </p>
                            </div>
                            <FriendButton
                                id={this.props.match.params.id}
                                showPM={this.state.showPM}
                            />
                            <button
                                onClick={(e) => this.togglePM(e)}
                                className="pm-button"
                            >
                                Wall Post
                            </button>
                        </div>
                    </div>

                    {this.state.showPM && (
                        <Wall id={this.props.match.params.id} />
                    )}
                </div>
            </>
        );
    }
}
