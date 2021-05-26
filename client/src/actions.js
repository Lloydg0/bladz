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
            // buttonText: "Accept Friend Request",
        };
    }
}

// accepting request data and Adding it to the global state.
export async function acceptFriend(id, buttonText) {
    console.log("method working", buttonText);
    const { data } = await axios
        .post("/friendRequest/" + id, {
            buttonText,
        })
        .catch(console.log);
    console.log("data in ACCEPTING FRIEND", data);
    if (data.success) {
        return {
            type: "ACCEPT_FRIEND",
            // friendsAndWannabes: data.payload,
            buttonText,
            id,
        };
    }
}
// // Getting the friend and request data and Adding it to the global state.
export async function unfriend(id, buttonText) {
    console.log("method working", buttonText);
    const { data } = await axios.post("/friendRequest/" + id, {
        buttonText,
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

// // Getting the friend and request data and Adding it to the global state.
export async function decline(id, buttonText) {
    console.log("method working", buttonText);
    const { data } = await axios.post("/friendRequest/" + id, {
        buttonText,
    });
    console.log("data in declining", data);
    if (data.success) {
        return {
            type: "DECLINE",
            id,
            buttonText,
        };
    }
}

// // getting the 10 most recent messages
export function chatMessages(msgs) {
    return {
        type: "CHAT_MESSAGES",
        msgs,
    };
}

// // getting the  most recent message
export function chatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        msg,
    };
}
