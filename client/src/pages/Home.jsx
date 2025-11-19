// Import styles
import * as styles from "./Home.css";

// Import components
import Header from "../components/layout/Header";

const Home = () => {
	return (
		<div className={styles.homePageContainer}>
			<div className={styles.gradient}>
				<Header page="home" />
				<div className={styles.homePageAppContent}>
					<div className={styles.heroSection}>
						<div className={styles.text}>
							<h1 className={styles.title}>Wistfully Wagashi</h1>
							<p className={styles.text}>
								Offering a beautiful variety of delicious
								wagashi. A true feast for the eyes.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Home;
