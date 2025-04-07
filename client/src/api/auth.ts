import { api } from "../utils/api";

export const login = async (credentials: {
	username: string;
	password: string;
}): Promise<{ token: string; user: User }> => {
	const response = await api.post("auth/login", credentials);
	return response.data;
};

export const signup = async (
	userdata: unknown
): Promise<{ token: string; user: User }> => {
	const response = await api.post("auth/signup", userdata);
	return response.data;
};
