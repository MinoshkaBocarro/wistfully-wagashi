import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Router
import { BrowserRouter } from "react-router-dom";

// Global styling
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

// CSS Reset
import "./styles/resets.css.js";

// CSS Base
import "./styles/base.css.js";

// Import app
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</StrictMode>
);
