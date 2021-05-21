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

    // const buttonText = useSelector((state) => state.buttonText);

    console.log("friends", friends);
    console.log("wanabees", wannabes);

    useEffect(() => {
        dispatch(getFriendsAndWannabes());
    }, []);

    return (
        <>
            <Route>
                <h1 className="usersearch-heading">Friends</h1>
                {friends &&
                    friends.map(({ id, url, first_name, last_name }) => {
                        console.log("id", id);
                        return (
                            <div className="user-search" key={id}>
                                <img className="search-user-img" src={url} />
                                <Link
                                    className="search-user-name"
                                    to={`/user/${id}`}
                                >
                                    {first_name + " " + last_name}
                                </Link>
                                <button
                                    className="add-friend-button"
                                    onClick={() =>
                                        dispatch(unfriend(id, "Remove Friend"))
                                    }
                                >
                                    Remove Friend
                                </button>
                            </div>
                        );
                    })}
                <h1 className="usersearch-heading">Friend Requests</h1>
                {wannabes &&
                    wannabes.map(({ id, url, first_name, last_name }) => {
                        console.log("id", id);
                        return (
                            <div className="user-search" key={id}>
                                <img className="search-user-img" src={url} />
                                <Link
                                    className="search-user-name"
                                    to={`/user/${id}`}
                                >
                                    {first_name + " " + last_name}
                                </Link>
                                <button
                                    className="add-friend-button"
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
                                    className="add-friend-button"
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
                    })}
            </Route>
        </>
    );
}
