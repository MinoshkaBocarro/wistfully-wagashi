// Import Bootstrap modules
import Container from "react-bootstrap/Container";
import { Navbar, Nav } from "react-bootstrap";

// Import router components
import { Link } from "react-router-dom";

// Import images
import logoImg from "../../assets/images/logo.png";

// Import components
import WiButton from "../common/buttons/WiButton";

// Import styles
import * as styles from "./Header.css";
import { RiShoppingBasketFill } from "react-icons/ri";
import useAuth from "../../hooks/useAuth";

const Header = ({ page }) => {
	const { user, logout } = useAuth();
	return (
		<Navbar
			className={page === "home" ? styles.homeNavbar : styles.navbar}
			variant="light"
			sticky="top"
			expand="lg"
		>
			<Container>
				<Navbar.Brand as={Link} className={styles.brandLink} to="/">
					<img
						className={styles.logo}
						src={logoImg}
						alt="Wistfully Wagashi Logo"
					/>
					{page !== "home" ? (
						<div className={styles.brand}>Wistfully Wagashi</div>
					) : null}
				</Navbar.Brand>
				<Navbar.Toggle
					data-bs-theme="dark"
					aria-controls="responsive-navbar-nav"
				/>
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className={`ms-auto ${styles.nav}`}>
						<Nav.Link
							className={
								page === "home"
									? styles.homeNavLink
									: styles.navLink
							}
							as={Link}
							to="/store/products"
						>
							Products
						</Nav.Link>
						{!user && (
							<WiButton
								additionalClasses={
									page === "home"
										? styles.homeHeaderButtonLink
										: styles.headerButtonLink
								}
							>
								<Nav.Link
									className={
										page === "home"
											? styles.homeNavLink
											: styles.navLink
									}
									as={Link}
									to="/signup"
								>
									Sign Up
								</Nav.Link>
							</WiButton>
						)}
						{!user && (
							<WiButton
								additionalClasses={
									page === "home"
										? styles.homeHeaderButtonLink
										: styles.headerButtonLink
								}
							>
								<Nav.Link
									className={
										page === "home"
											? styles.homeNavLink
											: styles.navLink
									}
									as={Link}
									to="/login"
								>
									Log In
								</Nav.Link>
							</WiButton>
						)}
						{user && (
							<WiButton
								additionalClasses={
									page === "home"
										? styles.homeHeaderButtonLink
										: styles.headerButtonLink
								}
							>
								<Nav.Link
									className={
										page === "home"
											? styles.homeNavLink
											: styles.navLink
									}
									as={Link}
									to="/dashboard"
								>
									Dashboard
								</Nav.Link>
							</WiButton>
						)}
						{user && (
							<WiButton
								additionalClasses={styles.headerButtonLink}
								onClick={logout}
							>
								Logout
							</WiButton>
						)}
						{/* TODO: Remove Button */}
						{/* <WiButton>
							<RiShoppingBasketFill />
						</WiButton> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
