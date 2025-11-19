import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

// Import auth
import useAuth from "../../hooks/useAuth";
import authService from "../../services/authService";

// Import components
import WiCard from "../../components/common/containers/WiCard";
import WiButton from "../../components/common/buttons/WiButton";

// Import styles
import * as styles from "./Login.css";

function Login() {
	const { loginSaveUser } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		console.log("location.state");
		console.log(location.state?.showNotLoggedInToast);
		// Double pop up only in dev mode
		if (location.state && location.state.showNotLoggedInToast) {
			toast.warn("You are not logged in");
			navigate("/login", { replace: true });
		}
	}, [location.state]);

	const [user, setUser] = useState({ email: "", password: "" });

	const { email, password } = user;

	const [loading, setLoading] = useState(false);

	const handleTextChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// API call
		try {
			const response = await authService.login(user);
			loginSaveUser(response.data);
			navigate("/dashboard");
		} catch (error) {
			setTimeout(() => {
				setLoading(false);
			}, 1000);
		}
	};

	return (
		<WiCard title="Log In" authForm={true}>
			<Form onSubmit={handleSubmit} data-bs-theme="dark">
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						placeholder="Email"
						name="email"
						onChange={handleTextChange}
						value={email}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						name="password"
						onChange={handleTextChange}
						value={password}
					/>
				</Form.Group>
				<div className={styles.buttonContainer}>
					<WiButton loadingState={loading}>
						{loading ? (
							<Spinner animation="border" variant="light" />
						) : (
							"Submit"
						)}
					</WiButton>
				</div>
			</Form>
			<div className={styles.userNav}>
				<span>
					Already a member?
					<Link to="/signup"> Sign Up Here</Link>
				</span>
			</div>
		</WiCard>
	);
}

export default Login;
