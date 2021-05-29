import React from "react";
import axios from "./axios";
import Profilepic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import { BrowserRouter, Route } from "react-router-dom";
import OtherProfile from "./otherprofile";
import FindPeople from "./findPeople";
import NavBar from "./navbar";
import FriendRequests from "./friendrequests";
import Chat from "./chat";
import News from "./news";
import Chart from "./charts";

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
        console.log("Bio being Set in the home component", newBio);
        this.setState({
            finishedBio: newBio,
        });
        console.log("finshed Bio when setBio runs", this.state.finishedBio);
    }

    async submitImage(file) {
        console.log("e in submitFile is running");
        var formData = new FormData();
        formData.append("file", file);
        try {
            const response = await axios.post("/upload", formData);
            this.setState({
                first_name: response.data.payload[0].first_name,
                last_name: response.data.payload[0].last_name,
                imgURL: response.data.payload[0].url,
            });
        } catch (err) {
            console.log("err in POST/upload", err);
        }
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
                <BrowserRouter>
                    <div className="main-navbar">
                        <img className="navbar-image" src="/logo.png" />
                        <div className="profile-pic-container">
                            <NavBar />
                            <Profilepic
                                toggleUploader={() => this.toggleUploader()}
                                first_name={this.state.first_name}
                                last_name={this.state.last_name}
                                imgURL={this.state.imgURL}
                            />
                        </div>
                    </div>

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
                                        this.state.imgURL || "/defaultIcon.jpeg"
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
                        <Route path="/chat" component={Chat} />
                        <Route path="/marketnews" component={News} />
                        <Route path="/charts" component={Chart} />
                    </div>
                </BrowserRouter>
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
