// Message.tsx
import React from "react";

const Message: React.FC<MessageProps> = ({ text, isUser, avatar }) => {
	return (
		<div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}>
			<div
				className={`flex ${
					isUser ? "flex-row-reverse" : "flex-row"
				} items-start`}
			>
				{avatar && (
					<img
						src={avatar}
						alt='avatar'
						className='w-8 h-8 rounded-full mr-2 ml-2'
						onError={(e) => {
							(e.target as HTMLImageElement).src = "/default-avatar.png"; // Fallback
						}}
					/>
				)}
				<div
					className={`max-w-2xl p-3 rounded-lg ${
						isUser ? "bg-blue-100" : "bg-gray-100"
					}`}
				>
					{text}
				</div>
			</div>
		</div>
	);
};

export default Message;
