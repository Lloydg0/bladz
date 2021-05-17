import axios from "./axios";
import { useState, useEffect } from "react";

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
                console.log("people input", peopleInput);
                const { data } = await axios.get("/find/users/" + peopleInput);
                if (!ignore) {
                    let newPeople = data.payload;
                    setPeople(newPeople);
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
                {console.log("people", people)}
                {people.map((user, index) => {
                    return (
                        <>
                            <div className="user-search">
                                <img
                                    className="search-user-img"
                                    key={index}
                                    src={user.url}
                                />
                                <div className="search-user-name" key={index}>
                                    {user.first_name + " " + user.last_name}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </>
    );
}
