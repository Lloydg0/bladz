import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindPeople from "./findPeople";
import NavBar from "./navbar";
import FriendRequests from "./friendrequests";
import Chat from "./chat";
import News from "./news";
import Charts from "./widgets/charts";
import Coins from "./coins";
import BlockChain from "./blockchain";

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = JSON.parse(localStorage.getItem("homeState")) || {
            first_name: "",
            last_name: "",
            imgURL: "" || "/defaultIcon.jpeg",
            uploaderIsVisible: false,
            finishedBio: "",
            id: "",
        };
    }

    componentDidUpdate() {
        localStorage.setItem("homeState", JSON.stringify(this.state));
    }

    async componentDidMount() {
        console.log("Home just mounted");
        const { data } = await axios.get("/home").catch(console.log);
        this.setState({
            first_name: data.payload[0].first_name,
            last_name: data.payload[0].last_name,
            imgURL: data.payload[0].url,
            finishedBio: data.payload[0].bio,
            id: data.payload[0].id,
        });
    }

    setBio(newBio) {
        this.setState({
            finishedBio: newBio,
        });
    }

    async submitImage(file) {
        var formData = new FormData();
        formData.append("file", file);
        const response = await axios
            .post("/upload", formData)
            .catch(console.log);
        this.setState({
            first_name: response.data.payload[0].first_name,
            last_name: response.data.payload[0].last_name,
            imgURL: response.data.payload[0].url,
        });
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <div className="navbar-divider">
                        <NavBar
                            first_name={this.state.first_name}
                            last_name={this.state.last_name}
                            toggleUploader={() => this.toggleUploader()}
                            imgURL={this.state.imgURL}
                        />
                    </div>
                    <div className="main-profile">
                        <div>
                            <Route
                                exact
                                path="/"
                                render={(props) => (
                                    <Profile
                                        setBio={(newBio) => this.setBio(newBio)}
                                        first_name={this.state.first_name}
                                        last_name={this.state.last_name}
                                        finishedBio={this.state.finishedBio}
                                        imgURL={
                                            this.state.imgURL ||
                                            "/defaultIcon.jpeg"
                                        }
                                        key={props.match.url}
                                        id={this.state.id}
                                    />
                                )}
                            />
                            <Route
                                path="/user/:id"
                                render={(props) => (
                                    <OtherProfile
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/find/user/"
                                render={(props) => (
                                    <FindPeople
                                        key={props.match.url}
                                        match={props.match}
                                        history={props.history}
                                    />
                                )}
                            />
                            <Route
                                path="/friends-wannabees"
                                component={FriendRequests}
                            />
                            <Route
                                path="/chat"
                                render={() => (
                                    <Chat loggedInUser={this.state.id} />
                                )}
                            />
                            <Route path="/marketnews" component={News} />
                            <Route path="/charts" component={Charts} />
                            <Route path="/coinsinfo" component={Coins} />
                            <Route
                                path="/livetradesinfo"
                                component={BlockChain}
                            />
                        </div>
                        {this.state.uploaderIsVisible && (
                            <Uploader
                                toggleUploader={() => this.toggleUploader()}
                                submitImage={(e) => this.submitImage(e)}
                                handleChangeOnForm={(e) =>
                                    this.handleChangeOnForm(e)
                                }
                            />
                        )}
                    </div>
                </BrowserRouter>
            </>
        );
    }
}
