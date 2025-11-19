// Import Auth
import useAuth from "../../hooks/useAuth";

// Import components
import WiCard from "../../components/common/containers/WiCard";
import WiButtonLink from "../../components/common/buttons/WiButtonLink";

// Import style
import * as styles from "./Dashboard.css";

function Dashboard() {
	const {
		user: { username },
	} = useAuth();

	return (
		<WiCard title="Profile" authForm>
			<div className={styles.text}>Welcome back {username}!</div>
			<div className={styles.button}>
				<WiButtonLink to="/store/product/add">Add Product</WiButtonLink>{" "}
			</div>
		</WiCard>
	);
}

export default Dashboard;
