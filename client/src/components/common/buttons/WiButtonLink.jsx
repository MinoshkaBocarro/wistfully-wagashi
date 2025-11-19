import { Link } from "react-router-dom";

// Import styles
import * as styles from "./buttonStyle.css";

function WiButtonLink({ onClick, children, to }) {
	return (
		<Link className={styles.button} to={to} onClick={onClick}>
			{children}
		</Link>
	);
}

export default WiButtonLink;
