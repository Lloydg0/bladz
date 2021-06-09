import { useEffect } from "react";
import {
    acceptFriend,
    unfriend,
    decline,
    getFriendsAndWannabes,
} from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { Route, Link } from "react-router-dom";

export default function FriendRequests() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((user) => user.accepted == true)
    );
    const wannabes = useSelector(
        (state) =>
            state.friendsAndWannabes &&
            state.friendsAndWannabes.filter((user) => user.accepted == false)
    );

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    return (
        <>
            <div className="top-level-friend-container">
                <Route>
                    <div className="main-friends-container">
                        <h1 className="request-heading-friends">Friends</h1>
                        <div className="inner-request-scroll">
                            {friends &&
                                friends.map(
                                    ({ id, url, first_name, last_name }) => {
                                        console.log("id", id);
                                        return (
                                            <div
                                                className="friend-request-container"
                                                key={id}
                                            >
                                                <img
                                                    className="friend-request-img"
                                                    src={url}
                                                />
                                                <Link
                                                    className="friend-request-name"
                                                    to={`/user/${id}`}
                                                >
                                                    {first_name +
                                                        " " +
                                                        last_name}
                                                </Link>
                                                <button
                                                    className="request-button"
                                                    onClick={() =>
                                                        dispatch(
                                                            unfriend(
                                                                id,
                                                                "Remove Friend"
                                                            )
                                                        )
                                                    }
                                                >
                                                    Remove Friend
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                    <div className="main-request-container">
                        <h1 className="request-heading-requests">
                            Friend Requests
                        </h1>
                        <div className="inner-request-scroll">
                            {wannabes &&
                                wannabes.map(
                                    ({ id, url, first_name, last_name }) => {
                                        console.log("id", id);
                                        return (
                                            <div
                                                className="friend-request-container"
                                                key={id}
                                            >
                                                <img
                                                    className="friend-request-img"
                                                    src={url}
                                                />
                                                <Link
                                                    className="friend-request-name"
                                                    to={`/user/${id}`}
                                                >
                                                    {first_name +
                                                        " " +
                                                        last_name}
                                                </Link>
                                                <button
                                                    className="request-button"
                                                    onClick={() =>
                                                        dispatch(
                                                            acceptFriend(
                                                                id,
                                                                "Accept Friend Request"
                                                            )
                                                        )
                                                    }
                                                >
                                                    Accept Friend Request
                                                </button>
                                                <button
                                                    className="request-button"
                                                    onClick={() =>
                                                        dispatch(
                                                            decline(
                                                                id,
                                                                "Decline Friend Request"
                                                            )
                                                        )
                                                    }
                                                >
                                                    Decline Friend Request
                                                </button>
                                            </div>
                                        );
                                    }
                                )}
                        </div>
                    </div>
                </Route>
            </div>
        </>
    );
}
