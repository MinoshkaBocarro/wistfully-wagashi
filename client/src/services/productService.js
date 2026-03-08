import api from "./api";

// GET ALL
function getAll() {
	return api.get("/api/products");
}

// GET ALL ON SALE
function getAllOnSale() {
	return api.get("/api/products/sale");
}

// POST PRODUCT
function post(data) {
	const formData = prepareFormData(data);
	return api.post("/api/products", formData, formConfig);
}

// GET PRODUCT BY ID
function getById(id) {
	return api.get("/api/products/" + id);
}

// PUT PRODUCT
function put(id, data, oldImageId) {
	const formData = prepareFormData(data, oldImageId);
	return api.put("/api/products/" + id, formData, formConfig);
}

// DELETE PRODUCT
function del(id) {
	return api.delete("/api/products/" + id);
}

const productService = {
	getAll,
	getAllOnSale,
	post,
	getById,
	put,
	del,
};

// POST/UPDATE Form variables
const formConfig = {
	headers: {
		"Content-Type": "multipart/form-data",
	},
};

const prepareFormData = (data, oldImageId) => {
	let formData = new FormData();

	formData.append("productName", data.productName);
	formData.append("description", data.description);
	formData.append("category", data.category);
	formData.append("price", data.price);
	formData.append("dietaryInformation", data.dietaryInformation);
	formData.append("weight", data.weight);
	formData.append("onSale", data.onSale);
	formData.append("isAvailable", data.isAvailable);
	formData.append("image", data.image);
	if (oldImageId) {
		formData.append("oldImageId", oldImageId);
	}

	return formData;
};

export default productService;
