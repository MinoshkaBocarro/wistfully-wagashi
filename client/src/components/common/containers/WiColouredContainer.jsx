import * as styles from "./WiColouredContainer.css";

const WiColouredContainer = ({ children, additionalClasses }) => {
	return (
		<div className={`${styles.container} ${additionalClasses}`}>
			{children}
		</div>
	);
};

export default WiColouredContainer;
