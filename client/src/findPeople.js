import axios from "./axios";
import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

export default function FindPeople() {
    const [people, setPeople] = useState([]);
    const [peopleInput, setPeopleInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const { data } = await axios.get("/find/users/");
                if (!ignore) {
                    console.log("top 3 people", data.payload);
                    setPeople(data.payload);
                } else {
                    console.log("ignored response");
                }
            } catch (err) {
                console.log(
                    "err in axios request for retrieving other users in search",
                    err
                );
            }
        })();
        return () => {
            ignore = true;
        };
    }, []);

    useEffect(() => {
        console.log("useEffect for searching for users just ran");
        let ignore = false;
        (async () => {
            try {
                const { data } = await axios.get("/find/users/" + peopleInput);
                if (!ignore) {
                    console.log("new people", data.payload);
                    setPeople(data.payload);
                } else {
                    console.log("ignored response");
                }
            } catch (err) {
                console.log(
                    "err in axios request for retrieving other users in search",
                    err
                );
            }
        })();
        return () => {
            ignore = true;
        };
    }, [peopleInput]);

    const onPeopleChange = ({ target }) => {
        setPeopleInput(target.value);
    };

    // const onPeopleClick = (e) => {
    //     e.preventDefault();
    //     location.href(`/find/user/${user.id}`);
    // };

    return (
        <>
            <h1 className="usersearch-heading">Find more People</h1>
            <input
                className="user-searchbar"
                name="searchPeople"
                onChange={onPeopleChange}
            />
            <div>
                {people.map((user) => {
                    return (
                        <>
                            <BrowserRouter>
                                <div>
                                    <Route
                                        exact
                                        path="/find/user/"
                                        render={() => (
                                            <div className="user-search">
                                                <img
                                                    // onClick={(e) =>
                                                    //     onPeopleClick(e)
                                                    // }
                                                    className="search-user-img"
                                                    key={user.id}
                                                    src={user.url}
                                                />
                                                <div
                                                    // onClick={(e) =>
                                                    //     onPeopleClick(e)
                                                    // }
                                                    className="search-user-name"
                                                    key={user.id}
                                                >
                                                    {user.first_name +
                                                        " " +
                                                        user.last_name}
                                                </div>
                                            </div>
                                        )}
                                    />
                                </div>
                            </BrowserRouter>
                            {/* <div className="user-search">
                                <img
                                    className="search-user-img"
                                    key={user.id}
                                    src={user.url}
                                />
                                <div className="search-user-name" key={user.id}>
                                    {user.first_name + " " + user.last_name}
                                </div>
                            </div> */}
                        </>
                    );
                })}
            </div>
        </>
    );
}
