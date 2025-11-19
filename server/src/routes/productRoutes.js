const express = require("express");
const router = express.Router();

// Import image file modules
const fileServerUpload = require("../middleware/fileServerUpload");
const FilePolicy = require("../policies/filePolicy");

// Import product modules
const ProductController = require("../controllers/productController");
const ProductPolicy = require("../policies/productPolicy");
const VerifyAuth = require("../middleware/verifyAuth");

module.exports = () => {
	// GET Products Route: Lists all products
	router.get("/", ProductController.getAllProducts);

	// GET onSale Products Route: Lists all products on sale
	router.get("/sale", ProductController.getAllSaleProducts);

	// POST Products Route: Adds a new product
	// Logged in users
	router.post(
		"/",
		[
			ProductPolicy.validateProduct,
			FilePolicy.filesPayloadExists,
			FilePolicy.fileSizeLimiter,
			FilePolicy.fileExtLimiter([
				".png",
				".jpg",
				".gif",
				".webp",
				"..jpeg",
			]),
			VerifyAuth.auth,
			fileServerUpload,
		],
		ProductController.postProduct
	);

	// GET Product by ID Route: Gets a product by it's id
	router.get("/:id", ProductController.getProductById);

	// UPDATE Product by ID Route: Gets a product by it's id and updates it
	// Logged in users
	router.put(
		"/:id",
		[
			ProductPolicy.validateProduct,
			FilePolicy.filesPayloadExists,
			FilePolicy.fileSizeLimiter,
			FilePolicy.fileExtLimiter([
				".png",
				".jpg",
				".gif",
				".webp",
				"..jpeg",
			]),
			VerifyAuth.auth,
			fileServerUpload,
		],
		ProductController.putProductById
	);

	// Logged in ADMIN users
	router.delete(
		"/:id",
		[VerifyAuth.auth, VerifyAuth.admin],
		ProductController.deleteProductById
	);

	return router;
};
