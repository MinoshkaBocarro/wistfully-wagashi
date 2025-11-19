import { Dots } from "@holmesdev/ponder-spinners";
vars;
// Import styles
import * as styles from "./WiLoader.css";
import { vars } from "../../styles/themes.css";

function WiLoader() {
	return (
		<div className={styles.loadingContainer}>
			<Dots
				className={styles.loadingSpinner}
				color1={vars.colors.accentDark}
				color2={vars.colors.accent}
				color3={vars.colors.accentLight}
			/>
		</div>
	);
}

export default WiLoader;
