import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
});

// Intercept response to handle unexpected errors
api.interceptors.response.use(null, (error) => {
	const expectedError =
		error.response &&
		error.response.status >= 400 &&
		error.response.status &&
		error.response.status < 500;
	console.log(expectedError);

	if (!expectedError) {
		console.log(`Interceptors - ${error}`);
		toast.error("Unexpected Error");
	} else {
		console.log(`${error}`);
		toast.warn(`${error?.response.data}`);
	}
	return Promise.reject(error);
});

// Set default request headers with token
export function setHeaderToken() {
	const token = localStorage.getItem("token");
	if (token) {
		// Logged in
		api.defaults.headers.common["Authorization"] = "Bearer " + token;
	} else {
		// Logged out
		delete api.defaults.headers.common["Authorization"];
	}
}

setHeaderToken();

export default api;
