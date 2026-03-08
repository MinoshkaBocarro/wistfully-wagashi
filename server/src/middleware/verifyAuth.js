const config = require("../config/config");
const ApiError = require("../utilities/ApiError");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
	let token = req.header("Authorization");

	if (!token) {
		return next(ApiError.denyAccess("No token provided"));
	}

	// Token exists but need to check if expired or invalid
	else token = token.substring(7, token.length);

	try {
		const decoded = jwt.verify(token, config.authentication.jwtSecret);
		req.user = decoded;
		next();
	} catch (error) {
		return next(ApiError.denyAccess("Invalid token"));
	}
};

const admin = (req, res, next) => {
	if (!req.user.isAdmin) {
		return next(ApiError.forbidden("Insufficient permissions"));
	}
	next();
};

const VerifyAuth = {
	auth,
	admin,
};

module.exports = VerifyAuth;
