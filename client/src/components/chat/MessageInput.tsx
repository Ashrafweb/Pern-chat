// MessageInput.tsx
import React, { useState } from "react";

interface MessageInputProps {
	onSendMessage: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
	const [inputText, setInputText] = useState("");

	const handleSendMessage = () => {
		if (inputText.trim()) {
			onSendMessage(inputText);
			setInputText("");
		}
	};

	return (
		<div className='p-4 border-t border-gray-700 dark:border-gray-700 flex items-center bg-gray-800 dark:bg-gray-900'>
			<input
				type='text'
				placeholder='Type your message...'
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						handleSendMessage();
					}
				}}
				className='flex-1 border rounded-l-md p-2 focus:outline-none focus:ring focus:border-slate-300 bg-gray-700 dark:bg-gray-800 text-gray-300 dark:text-gray-200'
			/>
			<button
				onClick={handleSendMessage}
				className='bg-slate-500 hover:bg-slate-600 text-white rounded-r-md p-2'
			>
				Send
			</button>
		</div>
	);
};

export default MessageInput;
