// Sidebar.tsx
import React, { useState } from "react";
import SearchBox from "./SearchBox";
import Conversations from "./Conversations";

interface Conversation {
	id: number;
	title: string;
	lastMessage: string;
	avatar?: string;
}

interface SidebarProps {
	onConversationSelect: (id: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onConversationSelect }) => {
	const [conversations, setConversations] = useState<Conversation[]>([
		{
			id: 1,
			title: "Project Brainstorm",
			lastMessage: "Discussed ideas...",
			avatar: "/vite.svg",
		},
		{
			id: 2,
			title: "Quick Questions",
			lastMessage: "Answered a question...",
			avatar: "/vite.svg",
		},
		{
			id: 3,
			title: "Code Review",
			lastMessage: "Reviewed some code...",
			avatar: "/vite.svg",
		},
	]);
	const [selectedConversationId, setSelectedConversationId] = useState<
		number | null
	>(null);

	const handleSelectConversation = (id: number) => {
		console.log(`Conversation selected: ${id}`);
		setSelectedConversationId(id);
		onConversationSelect(id); // Call the prop function.
	};

	const handleNewChat = () => {
		console.log("New chat started");
		const newConversation: Conversation = {
			id: Date.now(),
			title: "New Conversation",
			lastMessage: "...",
			avatar: "/default-avatar.png",
		};

		setConversations((prevConversations) => [
			...prevConversations,
			newConversation,
		]);
		setSelectedConversationId(newConversation.id);
		onConversationSelect(newConversation.id); // Also select the new chat.
	};

	return (
		<aside className='w-64 border-r flex flex-col h-screen bg-gray-800 dark:bg-gray-900 border-gray-700 dark:border-gray-700'>
			<div className='p-4 border-b border-gray-700 dark:border-gray-700'>
				<button
					onClick={handleNewChat}
					className='bg-slate-500 hover:bg-slate-600 text-white rounded p-2 w-full'
				>
					New Chat
				</button>
			</div>
			<SearchBox />
			<Conversations
				conversations={conversations}
				onSelectConversation={handleSelectConversation}
				selectedConversationId={selectedConversationId}
			/>
			<div className='p-4 border-t border-gray-700 dark:border-gray-700'>
				<button className='text-sm text-gray-300 dark:text-gray-200'>
					Settings
				</button>
			</div>
		</aside>
	);
};

export default Sidebar;
