// stores/chatStore.ts

import { create } from "zustand";

interface ChatState {
	conversations: Conversation[];
	messages: Message[];
	selectedConversationId: number | null;
	setConversations: (conversations: Conversation[]) => void;
	setMessages: (messages: Message[]) => void;
	setSelectedConversationId: (id: number | null) => void;
	addMessage: (message: Message) => void;
}

const useChatStore = create<ChatState>((set) => ({
	conversations: [],
	messages: [],
	selectedConversationId: null,
	setConversations: (conversations) => set({ conversations }),
	setMessages: (messages) => set({ messages }),
	setSelectedConversationId: (id) => set({ selectedConversationId: id }),
	addMessage: (message) =>
		set((state) => ({ messages: [...state.messages, message] })),
}));

export default useChatStore;
