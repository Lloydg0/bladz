import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    // console.log("Chat Messages", chatMessages);
    const elemRef = useRef();
    console.log("chat messages", chatMessages);

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

    // console.log("elemRef", elemRef);

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
                            return (
                                <>
                                    <div className="message-line" key={id}>
                                        <img
                                            className="chat-img"
                                            src={url}
                                        ></img>
                                        <div className="chat-text">{text}</div>
                                    </div>
                                    <div className="chat-name">
                                        -- {first_name} {last_name}
                                        {formattedDate}
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
