import api from "./api";

// Register POST Request
async function register(data) {
	const response = await api.post("/api/auth/register", data);
	return response;
}

// Login POST Request
async function login(data) {
	const response = await api.post("/api/auth/login", data);
	return response;
}

const authService = { register, login };

export default authService;
