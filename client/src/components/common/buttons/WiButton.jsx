// Import styles
import * as styles from "./buttonStyle.css";

function WiButton({ onClick, children, loadingState, additionalClasses }) {
	return (
		<button
			className={`${styles.button} ${additionalClasses}`}
			onClick={onClick}
			disabled={loadingState ? true : false}
		>
			{children}
		</button>
	);
}

export default WiButton;
