import axios from "./axios";
import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

export default function FindPeople() {
    const [people, setPeople] = useState([]);
    const [peopleInput, setPeopleInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios.get("/find/users/").catch(console.log);
            if (!ignore) {
                setPeople(data.payload);
            } else {
                console.log("ignored response");
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios
                .get("/find/users/" + peopleInput)
                .catch(console.log);
            if (!ignore) {
                setPeople(data.payload);
            } else {
                console.log("ignored response");
            }
        })();
        return () => {
            ignore = true;
        };
    }, [peopleInput]);

    const onPeopleChange = ({ target }) => {
        setPeopleInput(target.value);
    };

    return (
        <>
            <div className="main-search-container">
                <div className="search-container">
                    <div className="friends-input-heading-container">
                        <h1 className="find-friends-heading">Users</h1>
                        <div className="input-container">
                            <input
                                className="user-searchbar"
                                name="searchPeople"
                                onChange={onPeopleChange}
                            />
                        </div>
                    </div>
                    <div>
                        <div className="center-user-search">
                            <Route>
                                {people.map((user) => {
                                    console.log("userID", user.id);
                                    return (
                                        <div
                                            className="user-search"
                                            key={user.id}
                                        >
                                            <div className="search-card">
                                                <img
                                                    className="search-user-img"
                                                    src={user.url}
                                                />
                                                <Link
                                                    className="search-user-name"
                                                    to={`/user/${user.id}`}
                                                >
                                                    {user.first_name +
                                                        " " +
                                                        user.last_name}
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </Route>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
