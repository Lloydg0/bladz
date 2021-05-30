import { useEffect, useRef } from "react";
import { socket } from "./socket.js";
import { useSelector } from "react-redux";

export default function Wall({ id }) {
    const comments = useSelector((state) => state && state.comments);
    console.log("comments", comments);
    const elemRef = useRef();

    useEffect(() => {
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, [comments]);

    useEffect(() => {
        socket.emit("commentOnWall", {
            id,
        });
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            socket.emit("comment", {
                text: e.target.value,
                id,
            });
            e.target.value = "";
        }
    };

    //
    return (
        <div>
            <div className="full-comment-container">
                <div className="comment-container" ref={elemRef}>
                    <div className="comment-inner-container">
                        {comments &&
                            comments.map(
                                ({
                                    comment_text,
                                    created_at,
                                    first_name,
                                    last_name,
                                    url,
                                }) => {
                                    return (
                                        <div
                                            className="comment-box"
                                            key={created_at}
                                        >
                                            <img
                                                className="comment-img"
                                                src={url}
                                            ></img>
                                            <span className="comment-name">
                                                {first_name} {last_name}
                                            </span>
                                            <span className="comment-text">
                                                {comment_text}
                                            </span>
                                        </div>
                                    );
                                }
                            )}
                    </div>
                </div>

                <textarea
                    placeholder="Post on wall!"
                    onKeyDown={handleKeyDown}
                ></textarea>
                <button className="post-button">Post</button>
            </div>
        </div>
    );
}
