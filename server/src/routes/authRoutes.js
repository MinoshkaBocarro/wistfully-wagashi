const express = require("express");
const router = express.Router();

// Import auth modules
const AuthController = require("../controllers/authController");
const AuthPolicy = require("../policies/authPolicy");

module.exports = () => {
	// AUTH TEST Route: Lists all users (GET)
	router.get("/users", AuthController.listUsers);

	// Auth: Register
	router.post("/register", AuthPolicy.validateAuth, AuthController.register);

	// Auth: Login
	router.post("/login", AuthPolicy.validateAuth, AuthController.login);

	return router;
};
