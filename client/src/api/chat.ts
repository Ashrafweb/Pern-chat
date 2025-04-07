import { api } from "../utils/api";

export const getConversations = async (userId: string) => {
	const response = await api.get(`/chat/${userId}`);
	return response.data;
};

export const getMessages = async (conversationId: string) => {
	const response = await api.get(`/chat/messages/${conversationId}`);
	return response.data;
};
