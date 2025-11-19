import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import WiLoader from "../components/common/WiLoader";

import { setHeaderToken } from "../services/api";

// Create the context
const AuthContext = createContext();

// Define the context
export function AuthProvider({ children }) {
	// Define the context items
	const [user, setUser] = useState(null);
	const [userLoading, setUserLoading] = useState(true);
	const navigate = useNavigate();

	// Call current user on every page mount
	useEffect(() => {
		const userData = getCurrentUser();
		setUser(userData);
		setTimeout(() => {
			setUserLoading(false);
		}, 2000);
	}, []);

	// Login/Register function
	const loginSaveUser = async (data) => {
		const { token } = data;
		localStorage.setItem("token", token);
		setUser(jwtDecode(token));
		setHeaderToken();
	};

	// Check whether the user is logged in
	function getCurrentUser() {
		try {
			const token = localStorage.getItem("token");
			const savedUser = jwtDecode(token);
			return savedUser;
		} catch (error) {
			return null;
		}
	}

	// Logout function
	const logout = async () => {
		localStorage.removeItem("token");
		setUser(null);
		setHeaderToken();
		// Note for later - attach to the button trigger not context
		navigate("login", {
			replace: true,
			state: { loggingOut: true },
		});
	};

	const value = { user, loginSaveUser, logout, getCurrentUser };

	if (userLoading) {
		return <WiLoader />;
	}

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}

export default AuthContext;
