import { Link, useNavigate } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

// Import auth
import authService from "../../services/authService";
import useAuth from "../../hooks/useAuth";

// Import components
import WiCard from "../../components/common/containers/WiCard";

// Import styles
import * as styles from "./Signup.css";
import WiButton from "../../components/common/buttons/WiButton";

function Signup() {
	const { loginSaveUser } = useAuth();
	const navigate = useNavigate();

	const [user, setUser] = useState({ username: "", email: "", password: "" });

	const { username, email, password } = user;

	const [loading, setLoading] = useState(false);
	const passwordConfirmRef = useRef();

	const handleTextChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		// Client-side validation
		if (password !== passwordConfirmRef.current.value) {
			toast.warn("Passwords do not match");
			setLoading(false);
			return;
		}

		// API call
		try {
			const response = await authService.register(user);
			loginSaveUser(response.data);
			navigate("/dashboard");
		} catch (error) {
			setTimeout(() => {
				setLoading(false), 1000;
			});
		}
	};

	return (
		<WiCard title="Sign Up" authForm={true}>
			<Form onSubmit={handleSubmit} data-bs-theme="dark">
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control
						type="text"
						placeholder="Username"
						name="username"
						onChange={handleTextChange}
						value={username}
					/>
				</Form.Group>
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
				<Form.Group className="mb-3" controlId="password-confirm">
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password Confirmation"
						ref={passwordConfirmRef}
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
					<Link to="/login"> Login Here</Link>
				</span>
			</div>
		</WiCard>
	);
}

export default Signup;
