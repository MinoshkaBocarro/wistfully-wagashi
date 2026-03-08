import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Import components
import WiCard from "../../components/common/containers/WiCard";
import WiButton from "../../components/common/buttons/WiButton";
import WiLoader from "../../components/common/WiLoader";
import WiError from "../../components/common/WiError";

import {
	Form,
	InputGroup,
	Row,
	Col,
	Spinner,
	Container,
} from "react-bootstrap";

// Import services
import productService from "../../services/productService";

// Import functions
import { getFileIdFromUrl } from "../../utils/writeUtils";

// Import styles
import * as styles from "./EditProductPage.css";

function EditProductPage() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [productData, setProductData] = useState({
		id,
		productName: "",
		description: "",
		category: "",
		image: "",
		weight: 0,
		dietaryInformation: "",
		price: 0,
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

	// Store old image data in oldImage
	// const [oldImage, setOldImage] = useState({
	// 	id: "",
	// 	url: "",
	// });
	// Store old image data in oldImage
	const [oldImage, setOldImage] = useState("");
	const [preview, setPreview] = useState(true);

	// Fallback states
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	// Form prepopulated
	useEffect(() => {
		fetchProduct();
		setLoading(false);
	}, [id]);

	async function fetchProduct() {
		try {
			const response = await productService.getById(id);
			// Update state
			setProductData({ ...productData, ...response.data });

			// Clone the image url as oldImage
			if (!response.data.image) {
				throw new Error("No downloadUrl provided by db");
			} else {
				const fileGlob = getFileIdFromUrl(response.data.image);
				// const oldImageDetails = {
				// 	id: fileGlob,
				// 	url: response.data.image,
				// };
				// setOldImage(oldImageDetails);
				setOldImage(fileGlob);
			}
		} catch (error) {
			setError(true);
		}
	}

	// Form change functions
	// handleTextChange: Handle for state value changes for all text data
	const handleTextChange = (e) => {
		const { name, value } = e.target;
		setProductData({ ...productData, [name]: value });
	};

	// handleFileChange: Handle for state value changes for image files
	const handleFileChange = (e) => {
		// if (!e.target.files[0]) {
		// 	setProductData({ ...productData, image: oldImage.url });
		// 	setPreview(true);
		// 	return;
		// }
		const file = e.target.files[0];
		setProductData({ ...productData, image: file });
		setPreview(false);
	};

	// handleSubmit: passes request to api endpoint: POST /api/products
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await productService.put(
				id,
				productData,
				oldImage,
			);
			navigate(`/store/product/${id}`);
		} catch (error) {
			window.scroll({ top: 0, left: 0, behavior: "smooth" });
			setTimeout(() => {
				(setLoading(false), 1000);
			});
		}
	};

	// Conditional Load: Error
	if (error) {
		return <WiError>Something's gone wrong</WiError>;
	}

	// Conditional Load: Loading
	if (loading) {
		return (
			<Container className="text-center mt-4">
				<WiLoader />
			</Container>
		);
	}

	return (
		<WiCard title="Edit Product">
			<Form data-bs-theme="dark" onSubmit={handleSubmit}>
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
				{preview && !loading ? (
					<div className={styles.previewImageContainer}>
						<div className={styles.previewImage}>
							<img
								src={image}
								alt={`Preview of ${productName}`}
							/>
						</div>
					</div>
				) : null}
				<Form.Group className="mb-3" controlId="image">
					<Form.Label>Product image (will replace above)</Form.Label>
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

export default EditProductPage;
