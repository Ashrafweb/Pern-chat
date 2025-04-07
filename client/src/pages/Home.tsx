import React, { useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import ChatScreen from "../components/chat/ChatScreen";
import useAuthStore from "../zustand/authStore";
import { useNavigate } from "react-router-dom";

const Home = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [selectedConversationId, setSelectedConversationId] = useState<
		string | null
	>(null);
	const token = useAuthStore((state) => state.token);
	const navigate = useNavigate();
	if (!token) {
		navigate("/");
	}
	const handleSidebarToggle = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const handleConversationSelect = (id: number) => {
		setSelectedConversationId(id);
		setIsSidebarOpen(false); // Close sidebar on selection (mobile)
	};

	return (
		<div className='flex flex-col md:flex-row h-screen  dark:bg-gray-800'>
			{/* Mobile Sidebar Toggle Button */}
			<button
				onClick={handleSidebarToggle}
				className='md:hidden p-4 bg-gray-900 w-full text-left'
			>
				{isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
			</button>

			{/* Sidebar */}
			<div
				className={`w-full md:w-64 dark:bg-gray-600 text-dark-primary border-dark-primary border-r transition-transform duration-300  ${
					isSidebarOpen ? "translate-x-0" : "-translate-x-full"
				} md:translate-x-0`}
			>
				<Sidebar onConversationSelect={handleConversationSelect} />
			</div>

			{/* Chat Screen */}
			<div className='flex-1'>
				<ChatScreen conversationId={selectedConversationId} />
			</div>
		</div>
	);
};

export default Home;
