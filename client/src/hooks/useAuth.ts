import { login, signup } from "../api/auth";
import useAuthStore from "../zustand/authStore";

const useAuth = () => {
	const { setUser, setToken, logout } = useAuthStore();

	const handleLogin = async (credentials: {
		username: string;
		password: string;
	}) => {
		const { user, token } = await login(credentials);
		if (user && token) {
			setUser(user);
			setToken(token);
		}
	};

	const handleSignUp = async (credentials: unknown) => {
		const { user, token } = await signup(credentials);
		if (user && token) {
			setUser(user);
			setToken(token);
		}
	};

	const handleLogout = async () => {
		logout();
	};

	return { handleLogin, handleLogout, handleSignUp };
};

export default useAuth;
