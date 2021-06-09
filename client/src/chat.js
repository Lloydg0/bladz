import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Chat({ loggedInUser }) {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [chatMessages]);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("chatMessage", e.target.value);
            e.target.value = "";
        }
    };

    return (
        <div className="full-chat-container">
            <h1 className="chat-heading">Discussion Board</h1>
            <div className="chat-message-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(
                        ({
                            text,
                            created_at,
                            first_name,
                            last_name,
                            url,
                            id,
                            sender_id,
                        }) => {
                            console.log("message ID", id);
                            let date = new Date(created_at);
                            let formattedDate = new Intl.DateTimeFormat(
                                "en-GB",
                                {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                }
                            ).format(date);

                            let chatPosition =
                                "message-line" +
                                (sender_id === loggedInUser ? "" : "-reverse");

                            let dynamicMessageColor =
                                "chat-text" +
                                (sender_id === loggedInUser ? "" : "-reverse");

                            let dynamicChatNamePosition =
                                "chat-name" +
                                (sender_id === loggedInUser ? "" : "-reverse");

                            return (
                                <>
                                    <div key={id}>
                                        <div className={chatPosition}>
                                            <img
                                                className="chat-img"
                                                src={url}
                                            ></img>
                                            <div
                                                className={dynamicMessageColor}
                                            >
                                                {text}
                                            </div>
                                        </div>
                                        <div
                                            className={dynamicChatNamePosition}
                                        >
                                            -- {first_name} {last_name}
                                            {formattedDate}
                                        </div>
                                    </div>
                                </>
                            );
                        }
                    )}
            </div>
            <textarea
                placeholder="Write your message here"
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );
}
