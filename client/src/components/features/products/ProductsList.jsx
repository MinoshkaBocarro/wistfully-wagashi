// Import components
import ProductItem from "./ProductItem";

// Import styles
import * as styles from "./ProductsList.css";

function ProductsList({ products }) {
	return (
		<div className={styles.gridContainer}>
			<div className={styles.productGrid}>
				{products.length > 0 &&
					products.map((product) => (
						<ProductItem
							key={product.id}
							image={product.image}
							productName={product.productName}
							id={product.id}
							description={product.description}
							category={product.category}
							weight={product.weight}
							dietaryInformation={product.dietaryInformation}
							price={product.price}
							onSale={product.onSale}
							isAvailable={product.isAvailable}
						/>
					))}
			</div>
		</div>
	);
}

export default ProductsList;
