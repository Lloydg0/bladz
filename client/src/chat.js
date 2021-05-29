import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Chat() {
    const chatMessages = useSelector((state) => state && state.chatMessages);
    console.log("Chat Messages", chatMessages);
    const elemRef = useRef();

    useEffect(() => {
        // console.log("mounted");
        // console.log("ElemRef.current.scrollTop", elemRef.current.scrollTop);
        // console.log(
        //     "ElemRef.current.clienteight",
        //     elemRef.current.clientHeight
        // );
        // console.log(
        //     "ElemRef.current.scrollheight",
        //     elemRef.current.scrollHeight
        // );
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

    console.log("elemRef", elemRef);

    return (
        <div className="full-chat-container">
            <h1>Chat room</h1>
            <div className="chat-message-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(
                        ({ text, created_at, first_name, last_name, url }) => {
                            let date = new Date(created_at);
                            let formattedDate = new Intl.DateTimeFormat(
                                "en-GB",
                                {
                                    dateStyle: "long",
                                    timeStyle: "short",
                                }
                            ).format(date);
                            return (
                                <div className="message-line" key={created_at}>
                                    <img className="chat-img" src={url}></img>
                                    <span className="chat-text">
                                        {first_name} {last_name}
                                    </span>
                                    <span className="chat-text">{text}</span>
                                    <span className="chat-text">
                                        {formattedDate}
                                    </span>
                                </div>
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
