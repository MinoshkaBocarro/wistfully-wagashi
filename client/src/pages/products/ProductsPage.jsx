import { useEffect, useState } from "react";

// Auth
import useAuth from "../../hooks/useAuth";

// Import components
import ProductsList from "../../components/features/products/ProductsList";
import WiLoader from "../../components/common/WiLoader";
import WiButtonLink from "../../components/common/buttons/WiButtonLink";

import Container from "react-bootstrap/Container";

// Import services
import productService from "../../services/productService";

// Import styles
import * as styles from "./ProductsPage.css";
import WiColouredContainer from "../../components/common/containers/WiColouredContainer";
import WiError from "../../components/common/WiError";

function ProductsPage() {
	// User state
	const { user } = useAuth();
	// Products state
	const [products, setProducts] = useState([]);
	// Page state
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	// Tab state
	const [currentTab, setCurrentTab] = useState("all");

	useEffect(() => {
		fetchProducts();
	}, []);

	useEffect(() => {
		if (currentTab === "all") {
			fetchProducts();
		} else if (currentTab === "sale") {
			fetchSaleProducts();
		}
	}, [currentTab]);

	async function fetchProducts() {
		try {
			const response = await productService.getAll();
			const data = await response.data;
			setProducts(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}

	async function fetchSaleProducts() {
		try {
			const response = await productService.getAllOnSale();
			const data = await response.data;
			setProducts(data);
		} catch (error) {
			setError(true);
		} finally {
			setLoading(false);
		}
	}

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
		<Container className="text-center mt-4">
			<div className={styles.heading}>
				<div className={styles.headingContent}>
					<h1 className={styles.title}>The Art of Wagashi:</h1>
					<h2 className={styles.subtitle}>Handcrafted Sweets</h2>
					<p>
						Discover the elegance of wagashi - traditional Japanese
						confection! From chewy daifuku to intricate nerikiri and
						satisfying yōkan, each piece is absolutely delectable
						and is perfectly paired with tea.
					</p>
				</div>
			</div>
			{user && (
				<div className={styles.buttonContainer}>
					<WiButtonLink to="/store/product/add">
						Add Product
					</WiButtonLink>
				</div>
			)}
			<div className={styles.categorySwitch}>
				<h2
					className={`${styles.categorySwitchItem} ${
						currentTab === "all" && styles.categoryOn
					}`}
					onClick={() => setCurrentTab("all")}
				>
					All
				</h2>
				<div aria-hidden="true" className={styles.separator}></div>
				<h2
					className={`${styles.categorySwitchItem} ${
						currentTab === "sale" && styles.categoryOn
					}`}
					onClick={() => setCurrentTab("sale")}
				>
					Sale
				</h2>
			</div>
			<ProductsList products={products} />
		</Container>
	);
}

export default ProductsPage;
