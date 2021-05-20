//  /src/action.js

import axios from "./axios";

// file containes all of the action functions
// just function thats return an object with a property called type
// we also have a payload/data that we pass to reducer so that it can update the global state

// Getting the friend and request data and Adding it to the global state.
export async function getFriendsAndWannabes() {
    const { data } = await axios.get("/friends-wannabes");
    console.log("data in getting friends and wannabeas", data);
    if (data.success) {
        return {
            type: "GET_FRIENDS_AND_WANNABES",
            friendsAndWannabes: data.payload,
            buttonText: "Accept Friend Request",
        };
    }
}

// accepting request data and Adding it to the global state.
export async function acceptFriend(id, buttonText) {
    console.log("method working");
    const { data } = await axios
        .post("/friendRequest/" + id, {
            buttonText: "Accept Friend Request",
        })
        .catch(console.log);
    console.log("data in ACCEPTING FRIEND", data);
    if (data.success) {
        return {
            type: "ACCEPT_FRIEND",
            buttonText,
            id,
        };
    }
}
// // Getting the friend and request data and Adding it to the global state.
export async function unfriend(id, buttonText) {
    const { data } = await axios.post("/friendRequest/" + id, {
        buttonText: "Remove Friend",
    });
    console.log("data in UNFRIENDING", data);
    if (data.success) {
        return {
            type: "UNFRIEND",
            id,
            buttonText,
        };
    }
}
