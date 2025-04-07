import React from "react";

interface ConversationsProps {
	conversations: Conversation[];
	onSelectConversation: (id: string) => void;
	selectedConversationId: string | null;
}

const Conversations: React.FC<ConversationsProps> = ({
	conversations,
	onSelectConversation,
	selectedConversationId,
}) => {
	if (conversations.length === 0) {
		return (
			<div className='p-4 text-center text-gray-500'>
				No conversations yet. Start a new chat!
			</div>
		);
	}

	return (
		<div className='overflow-y-auto scroll-smooth'>
			{conversations.map((conversation) => (
				<div
					key={conversation.id}
					onClick={() => onSelectConversation(conversation.id)}
					className={`p-3 cursor-pointer hover:bg-gray-700 dark:hover:bg-gray-600 ${
						selectedConversationId === conversation.id
							? "bg-gray-600 dark:bg-gray-700"
							: ""
					}`}
					aria-selected={selectedConversationId === conversation.id}
					role='option'
					tabIndex={0}
				>
					{conversation.avatar && (
						<img
							src={conversation.avatar}
							alt='avatar'
							className='w-8 h-8 rounded-full inline-block mr-2'
							onError={(e) => {
								(e.target as HTMLImageElement).src = "/default-avatar.png"; // Fallback
							}}
						/>
					)}
					<div className='font-semibold inline-block text-gray-300 dark:text-gray-200'>
						{conversation.title}
					</div>
					<div className='text-sm text-gray-400 dark:text-gray-300'>
						{conversation.lastMessage}
					</div>
				</div>
			))}
		</div>
	);
};

export default Conversations;
