// ChatScreen.tsx
import React, { useState, useRef, useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";
import { sendMessageSocket } from "../../utils/socket";
import useAuthStore from "../../zustand/authStore";
import { getMessages } from "../../api/chat";

const ChatScreen: React.FC<ChatScreenProps> = ({ conversationId }) => {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const chatHistoryRef = useRef<HTMLDivElement>(null);
	const { user } = useAuthStore();
	const handleSendMessage = (text: string) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{ text, isUser: true, avatar: user?.profilePic || "" },
		]);

		sendMessageSocket({
			body: text,
			conversationId: conversationId ?? "",
			senderId: user?.id,
		});
		// setTimeout(() => {
		// 	setMessages((prevMessages) => [
		// 		...prevMessages,
		// 		{ text: `AI response to: ${text}`, isUser: false, avatar: "/vite.svg" },
		// 	]);
		// }, 500);
	};

	useEffect(() => {
		if (chatHistoryRef.current) {
			chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
		}
	}, [messages]);

	useEffect(() => {
		const fetchChats = async () => {
			const chats = await getMessages(conversationId ?? "");
			setMessages(chats);
		};

		fetchChats();
	}, []);
	if (conversationId === null) {
		return (
			<div className='flex-1 p-4 text-center text-gray-500'>
				Select a conversation to start chatting.
			</div>
		);
	} else {
		return (
			<div className='flex flex-col h-screen flex-1'>
				<div ref={chatHistoryRef} className='flex-1 overflow-y-auto p-4'>
					{messages.map((message, index) => (
						<Message key={index} {...message} />
					))}
				</div>
				<MessageInput onSendMessage={handleSendMessage} />
			</div>
		);
	}
};

export default ChatScreen;
