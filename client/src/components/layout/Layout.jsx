// Import npm packages
import { Outlet } from "react-router-dom";
import { ToastContainer, Bounce } from "react-toastify";

// Import components
import Footer from "./Footer";
import Header from "./Header";

// Import styles
import * as styles from "./Layout.css";

function Layout() {
	return (
		<div className={styles.app}>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick={false}
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				transition={Bounce}
			/>
			<Header />
			<div className={styles.appContent}>
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}

export default Layout;
