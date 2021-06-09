import { useState, useEffect } from "react";
import axios from "./axios";

export default function FriendshipButton(id) {
    const [buttonText, setButtonText] = useState([]);
    let viewedUserId = id.id;

    useEffect(() => {
        (async () => {
            const { data } = await axios
                .get("/friendRequest/" + viewedUserId)
                .catch(console.log);

            const btnStatus = data.payload[0];

            if (data.payload == 0) {
                setButtonText("Add Friend");
            } else if (
                btnStatus.accepted == false &&
                btnStatus.sender_id == viewedUserId
            ) {
                setButtonText("Accept Friend Request");
            } else if (
                btnStatus.accepted == false &&
                btnStatus.sender_id != viewedUserId
            ) {
                setButtonText("Cancel Friend Request");
            } else if (btnStatus.accepted == true) {
                setButtonText("Remove Friend");
            }
        })();
    }, []);

    const onButtonTextClick = (e) => {
        e.preventDefault();
        axios
            .post("/friendRequest/" + viewedUserId, { buttonText: buttonText })
            .then((response) => {
                setButtonText(response.data.buttonText);
            })
            .catch((err) => {
                console.log(err);
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
