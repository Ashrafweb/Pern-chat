import { io, Socket } from "socket.io-client";
import useChatStore from "../zustand/chatStore";

let socket: Socket | null = null;
export const connectSocket = (token: string) => {
	if (socket) return;

	socket = io("http://localhost:3000/", {
		auth: {
			token: token,
		},
	});

	socket.on("connect", () => {
		console.log("Socket Connected");
	});

	socket.on("message", (message: Message) => {
		useChatStore.getState().addMessage(message);
	});

	socket.on("disconnect", () => {
		console.log("Socket Disconnected");
	});

	socket.on("connect_error", (err) => {
		console.log("Socket connect error due to " + err.message);
	});
};

export const disconnectSocket = () => {
	if (socket) {
		socket.disconnect();
		socket = null;
	}
};

export const sendMessageSocket = (message: Message) => {
	if (socket) {
		socket.emit("message", message);
	} else {
		console.error("Socket not connected");
	}
};
