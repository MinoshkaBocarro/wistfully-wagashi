import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Container, Spinner } from "react-bootstrap";
import WiLoader from "../../components/common/WiLoader";
import WiButtonLink from "../../components/common/buttons/WiButtonLink";
import WiButton from "../../components/common/buttons/WiButtonLink";

import * as styles from "./ProductDetailPage.css";

import ProductService from "../../services/productService";
import useAuth from "../../hooks/useAuth";
import { priceFormatter } from "../../utils/readUtils";
import WiColouredContainer from "../../components/common/containers/WiColouredContainer";
import WiError from "../../components/common/WiError";

function productDetailPage() {
	const navigate = useNavigate();
	const params = useParams();
	const { user } = useAuth();
	const [productData, setProductData] = useState({
		id: params.id,
		productName: "",
		description: "",
		category: "",
		image: null,
		weight: 0,
		dietaryInformation: "",
		price: 0,
		onSale: false,
		isAvailable: true,
	});
	// Page state
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	const {
		image,
		productName,
		description,
		category,
		price,
		dietaryInformation,
		weight,
		isAvailable,
		onSale,
		id,
	} = productData;

	useEffect(() => {
		fetchProduct();
		setLoading(false);
	}, [id]);

	async function fetchProduct() {
		try {
			const response = await ProductService.getById(id);
			// Update state
			setProductData({ ...productData, ...response.data });
		} catch (error) {
			setError(true);
		}
	}

	const handleDeleteClick = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			const response = await ProductService.del(id);
			// on success redirect
			setLoading(false);
			navigate("/store/products");
		} catch (error) {
			setError(true);
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
		<Container className={styles.pageCenter}>
			<div className={styles.container}>
				<div className={styles.imageContainer}>
					<img
						src={image}
						alt={productName}
						className={styles.image}
					/>
				</div>
				<div className={styles.productInformationContainer}>
					<WiColouredContainer
						additionalClasses={styles.productInformation}
					>
						<div className={styles.category}>{category}</div>
						<div className={styles.productContentContainer}>
							<h1 className={styles.title}>{productName}</h1>
							<p className={styles.description}>{description}</p>
							<div className={styles.price}>
								<div>{priceFormatter(price)}</div>
							</div>
							<div className={styles.detailsList}>
								<div className={styles.infoGroup}>
									<div className={styles.label}>Weight:</div>
									<div>{weight}g</div>
								</div>
								<div className={styles.infoGroup}>
									<div className={styles.label}>
										Dietary Info:
									</div>
									<div>{dietaryInformation}</div>
								</div>
							</div>
							<div>
								<div className={styles.stock}>
									{isAvailable ? "In Stock" : "Out of Stock"}
								</div>
							</div>
						</div>
						{user && (
							<div className={styles.buttonContainer}>
								<WiButtonLink to={`/store/product/edit/${id}`}>
									Edit
								</WiButtonLink>
								{/* TODO: FIX UP DELETE BUTTON */}
								<WiButton
									onClick={handleDeleteClick}
									loadingState={loading}
								>
									{loading ? (
										<Spinner
											as="span"
											animation="border"
											size="sm"
											role="status"
											aria-hidden="true"
										/>
									) : (
										"Delete"
									)}
								</WiButton>
							</div>
						)}
					</WiColouredContainer>
				</div>
			</div>
		</Container>
	);
}

export default productDetailPage;
