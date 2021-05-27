//reducer.js is a big function with many conditionals  that chgeck which action to run
// for almost every action needs a new conditional

export default function reducer(state = {}, action) {
    if (action.type === "GET_FRIENDS_AND_WANNABES") {
        state = {
            ...state,
            friendsAndWannabes: action.friendsAndWannabes,
            buttonText: action.buttonText,
        };
    }

    if (action.type == "ACCEPT_FRIEND") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map((user) => {
                if (user.id == action.id) {
                    user["accepted"] = true;
                    return user;
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter((user) => {
                if (user.id == action.id) {
                    user["accepted"] = null;
                    return user;
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "DECLINE") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.filter((user) => {
                if (user.id == action.id) {
                    user["accepted"] = null;
                    return user;
                } else {
                    return user;
                }
            }),
        };
    }

    if (action.type == "CHAT_MESSAGES") {
        state = {
            ...state,
            chatMessages: action.msgs,
        };
    }

    if (action.type == "CHAT_MESSAGE") {
        const newChatMessages = state.chatMessages
            ? [...state.chatMessages, action.msg]
            : [action.msg];
        state = {
            ...state,
            chatMessages: newChatMessages,
        };
    }

    if (action.type == "COMMENTS") {
        state = {
            ...state,
            comments: action.coms,
        };
    }

    if (action.type == "COMMENT") {
        let newComments = state.comments.slice();
        newComments.push(action.com);
        state = {
            ...state,
            comments: newComments,
        };
    }

    return state;
}
