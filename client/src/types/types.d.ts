interface Conversation {
	id: string;
	title: string;
	lastMessage: string;
	avatar?: string;
}

interface MessageProps {
	text: string;
	isUser: boolean;
	avatar?: string;
}
interface ChatScreenProps {
	conversationId: string | null;
}

interface ChatMessage {
	text: string;
	isUser: boolean;
	avatar?: string;
}

interface Message {
	id?: string;
	conversationId: string;
	senderId?: string;
	body: string;
	createdAt?: string;
}

interface User {
	id: string;
	username: string;
	email: string;
	profilePic: string;
	gender: "male" | "female";
}
