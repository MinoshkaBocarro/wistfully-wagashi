// Import express
const express = require("express");
const router = express.Router();

// Import routes
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");

module.exports = () => {
	// Test Home Endpoint
	router.get("/", (req, res, next) => {
		res.send("Welcome to Wistfully");
	});

	//  Sub Routes
	router.use("/auth", authRoutes());
	router.use("/products", productRoutes());

	return router;
};
