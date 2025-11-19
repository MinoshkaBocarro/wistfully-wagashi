// Import styles
import * as styles from "./Footer.css";

function Footer({ page }) {
	const getCurrentYear = () => {
		return new Date().getFullYear();
	};

	return (
		<footer className={styles.footer}>
			<span>&copy; {getCurrentYear()} Wistfully Wagashi</span>
		</footer>
	);
}

export default Footer;
