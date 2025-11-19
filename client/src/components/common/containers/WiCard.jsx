import * as styles from "./WiCard.css";

const WiCard = ({ title, authForm, children }) => {
	return (
		<div className={styles.container}>
			<div
				className={`${styles.leadCard} ${
					authForm ? styles.authForm : styles.generalForm
				}`}
			>
				<h2 className={styles.cardTitle}>{title}</h2>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default WiCard;
