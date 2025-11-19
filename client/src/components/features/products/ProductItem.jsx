// Import styles
import { Link } from "react-router-dom";
import * as styles from "./ProductItem.css";
import { priceFormatter } from "../../../utils/readUtils";
import WiColouredContainer from "../../common/containers/WiColouredContainer";

function ProductItem({
	image,
	productName,
	id,
	description,
	category,
	weight,
	dietaryInformation,
	price,
	onSale,
	isAvailable,
}) {
	return (
		<WiColouredContainer>
			<Link className={styles.productCard} to={`/store/product/${id}`}>
				<img className={styles.image} src={image} alt={productName} />
				<div className={styles.productCardContent}>
					<h3 className={styles.cardHeading}>{productName}</h3>
					<p>{priceFormatter(price)}</p>
				</div>
			</Link>
		</WiColouredContainer>
	);
}

export default ProductItem;
