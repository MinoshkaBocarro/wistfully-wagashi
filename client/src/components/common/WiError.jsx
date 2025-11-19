import { GiTeapotLeaves } from "react-icons/gi";
import { Link } from "react-router-dom";

// Import styles
import * as styles from "./WiError.css";

function WiError({ children }) {
	return (
		<div className={styles.notFoundBox}>
			<h1>Sorry</h1>
			<div className={styles.text}>
				<p>{children}</p>
				<p>Head back home!</p>
			</div>
			<Link to="/">
				<GiTeapotLeaves aria-labelledby="Home button" size={80} />
			</Link>
		</div>
	);
}

export default WiError;
