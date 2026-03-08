import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import WiCard from "../../components/common/containers/WiCard";
import WiButton from "../../components/common/buttons/WiButton";
import { Form, InputGroup, Row, Col, Spinner } from "react-bootstrap";

// Import services
import productService from "../../services/productService";

// Import styles
import * as styles from "./EditProductPage.css";

function AddProductPage() {
	const navigate = useNavigate();

	const [productData, setProductData] = useState({
		productName: "",
		description: "",
		category: "",
		image: "",
		weight: 1,
		dietaryInformation: "",
		price: 1,
		onSale: false,
		isAvailable: true,
	});
	const {
		productName,
		description,
		category,
		image,
		weight,
		dietaryInformation,
		price,
		onSale,
		isAvailable,
	} = productData;

	const [loading, setLoading] = useState(false);

	// Form change functions

	// handleTextChange: Handle for state value changes for all text data
	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setProductData({ ...productData, [name]: value });
	};

	// handleFileChange: Handle for state value changes for image files
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setProductData({ ...productData, image: file });
	};

	// handleSubmit: passes request to api endpoint: POST /api/products
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await productService.post(productData);
			navigate("/store/products");
		} catch (error) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
			setTimeout(() => {
				(setLoading(false), 1000);
			});
		}
	};

	return (
		<WiCard title="Add Product">
			<Form onSubmit={handleSubmit} data-bs-theme="dark">
				{/* GROUP 1: Product Classification */}
				<Row>
					{/* GROUP 1A: NAME */}{" "}
					<Col lg={6} md={6} sm={12}>
						<Form.Group className="mb-3">
							<Form.Label>Product name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter product name"
								name="productName"
								value={productName}
								onChange={handleTextChange}
							/>
						</Form.Group>
					</Col>
					{/* GROUP 1B: CATEGORY */}
					<Col lg={6} md={6} sm={12}>
						<Form.Group className="mb-3">
							<Form.Label>Product category</Form.Label>
							<Form.Control
								as="select"
								name="category"
								value={category}
								onChange={handleTextChange}
							>
								<option value="">
									Please enter product category ...
								</option>
								<option value="Dango">Dango</option>
								<option value="Soft Confection">
									Soft Confection
								</option>
								<option value="Nerikiri">Nerikiri</option>
								<option value="Manju">Manju</option>
							</Form.Control>
						</Form.Group>
					</Col>
				</Row>
				{/* GROUP 2: Product Descriptions */}
				<Row>
					{/* 2A: DESCRIPTION */}
					<Col lg={6} md={6} sm={12}>
						<Form.Group className="mb-3">
							<Form.Label>Product description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter product description"
								name="description"
								value={description}
								onChange={handleTextChange}
							/>
						</Form.Group>
					</Col>
					{/* 2B: DIETARY INFORMATION */}
					<Col lg={6} md={6} sm={12}>
						<Form.Label>Product dietary information</Form.Label>
						<Form.Control
							type="text"
							placeholder="Enter comma separated info"
							name="dietaryInformation"
							value={dietaryInformation}
							onChange={handleTextChange}
						/>
					</Col>
				</Row>
				{/* GROUP 3: Product Numbers */}
				<Form.Group className="mb-3">
					<Row>
						{/* 3A: PRICE */}
						<Col llg={6} md={6} sm={12}>
							<Form.Label>Product price</Form.Label>
							<InputGroup>
								<InputGroup.Text id="price-dollar">
									$
								</InputGroup.Text>
								<Form.Control
									type="number"
									aria-describedby="price-dollar"
									id="price-input"
									name="price"
									value={price}
									onChange={handleTextChange}
									placeholder="0"
								/>
							</InputGroup>
						</Col>
						{/* 3B: WEIGHT */}
						<Col lg={6} md={6} sm={12}>
							<Form.Label>Product weight</Form.Label>
							<InputGroup>
								<Form.Control
									type="number"
									aria-describedby="price-dollar"
									id="weight-input"
									name="weight"
									value={weight}
									onChange={handleTextChange}
									placeholder="0"
								/>
								<InputGroup.Text id="weight-grams">
									g
								</InputGroup.Text>
							</InputGroup>
						</Col>
					</Row>
				</Form.Group>

				{/* GROUP 4: Product Sales Details */}
				<Form.Group className="mb-3">
					<Row>
						{/* 4A: ON SALE */}
						<Col lg={6} md={6} sm={12}>
							<Form.Label>Product sale status</Form.Label>
							<Form.Control
								as="select"
								name="onSale"
								value={onSale}
								onChange={handleTextChange}
							>
								<option value={false}>Standard</option>
								<option value={true}>On Sale</option>
							</Form.Control>
						</Col>

						{/* 4B: IS AVAILABLE */}
						<Col lg={6} md={6} sm={12}>
							<Form.Label>Product availability</Form.Label>
							<Form.Control
								as="select"
								name="isAvailable"
								value={isAvailable}
								onChange={handleTextChange}
							>
								<option value={true}>In Stock</option>
								<option value={false}>Out of Stock</option>
							</Form.Control>
						</Col>
					</Row>
				</Form.Group>
				{/* GROUP 5: PRODUCT IMAGE */}
				<Form.Group className="mb-3" controlId="image">
					<Form.Label>Product image</Form.Label>
					<Form.Control
						type="file"
						className="mb-4"
						onChange={handleFileChange}
					/>
				</Form.Group>

				{/* SUBMIT BUTTON */}
				<div className={styles.button}>
					<WiButton loadingState={loading}>
						{loading ? (
							<Spinner animation="border" variant="light" />
						) : (
							"Submit"
						)}
					</WiButton>
				</div>
			</Form>
		</WiCard>
	);
}

export default AddProductPage;
