import { create } from "zustand";
import { connectSocket, disconnectSocket } from "../utils/socket";

interface AuthState {
	user: User | null;
	token: string | null;
	setUser: (user: User | null) => void;
	setToken: (token: string) => void;
	logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	token: localStorage.getItem("token"),
	setUser: (user) => set({ user }),
	setToken: (token) => {
		set({ token });
		if (token) {
			localStorage.setItem("token", token);
			connectSocket(token);
		} else {
			localStorage.removeItem("token");
			disconnectSocket();
		}
	},
	logout: () => {
		set({ user: null, token: null });
	},
}));

export default useAuthStore;
