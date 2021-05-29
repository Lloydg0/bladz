import io from "socket.io-client";

import { chatMessages, chatMessage, comments, comment } from "./actions";

export let socket;

export const init = (store) => {
    if (!socket) {
        socket = io.connect();

        socket.on("chatMessages", (msgs) => store.dispatch(chatMessages(msgs)));

        socket.on("chatMessage", (msg) => store.dispatch(chatMessage(msg)));

        socket.on("comments", (coms) => store.dispatch(comments(coms)));
        socket.on("comment", (com) => store.dispatch(comment(com)));
    }
};
