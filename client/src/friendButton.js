import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton(id) {
    const [buttonText, setButtonText] = useState([]);
    let viewedUserId = id.id;

    useEffect(() => {
        console.log("useEffect for buttonText just ran");
        (async () => {
            try {
                console.log("id for user searched", viewedUserId);
                const { data } = await axios.get(
                    "/friendRequest/" + viewedUserId
                );
                console.log("data in axios.get request for buttonText", data);
            } catch (err) {
                console.log(
                    "err in axios request for making a request for button text in search",
                    err
                );
            }
        })();
    }, []);

    const onButtonTextClick = (e) => {
        e.preventDefault();
        axios
            .post("/friendRequest/" + viewedUserId, { buttonText: buttonText })
            .then((response) => {
                console.log("Response in POST friendRequest Route", response);
                setButtonText(response.data.buttonText);
            })
            .catch((err) => {
                console.log("Error in POST friendRequest route", err);
            });
    };

    return (
        <>
            <button
                className="add-friend-button"
                onClick={(e) => onButtonTextClick(e)}
            >
                {buttonText}
            </button>
        </>
    );
}
