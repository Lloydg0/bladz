import axios from "./axios";
import { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";

export default function FindPeople() {
    const [people, setPeople] = useState([]);
    const [peopleInput, setPeopleInput] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                const { data } = await axios.get("/find/users/");
                if (!ignore) {
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

    return (
        <>
            <h1 className="usersearch-heading">Find more People</h1>
            <input
                className="user-searchbar"
                name="searchPeople"
                onChange={onPeopleChange}
            />
            <div>
                <Route>
                    {people.map((user) => {
                        return (
                            <div className="user-search" key={user.id}>
                                <img
                                    className="search-user-img"
                                    src={user.url}
                                />
                                <Link
                                    className="search-user-name"
                                    to={`/user/${user.id}`}
                                >
                                    {user.first_name + " " + user.last_name}
                                </Link>
                            </div>
                        );
                    })}
                </Route>
            </div>
        </>
    );
}
