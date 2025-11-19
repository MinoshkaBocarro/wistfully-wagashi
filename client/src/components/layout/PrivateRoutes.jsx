import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function PrivateRoutes() {
	const { getCurrentUser } = useAuth();
	const location = useLocation();

	return getCurrentUser() ? (
		// Logged In
		<Outlet />
	) : (
		// Logged Out
		<Navigate
			to="/login"
			state={{
				from: location,
				showNotLoggedInToast: !location.state?.loggingOut
					? false
					: true,
			}}
			replace
		/>
	);
}

export default PrivateRoutes;
