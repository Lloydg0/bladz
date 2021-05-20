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
                    return {
                        ...state,
                        accepted: true,
                        buttonText: action.buttonText,
                        id: action.id,
                    };
                } else {
                    return user;
                }
            }),
        };
    }
    if (action.type == "UNFRIEND") {
        state = {
            ...state,
            friendsAndWannabes: state.friendsAndWannabes.map((user) => {
                if (user.id == action.id) {
                    return {
                        ...state,
                        accepted: false,
                        buttonText: action.buttonText,
                        id: action.id,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
