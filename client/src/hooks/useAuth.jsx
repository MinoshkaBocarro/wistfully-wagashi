import { useContext, useDebugValue } from "react";

import AuthContext from "../contexts/AuthContext";

const useAuth = () => {
	const context = useContext(AuthContext);
	useDebugValue(context.user, (user) =>
		user?.id ? "Logged in" : "Logged out"
	);

	return context;
};

export default useAuth;
