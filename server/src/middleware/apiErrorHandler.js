const ApiError = require("../utilities/ApiError");

function apiErrorHandler(error, req, res, next) {
	// Check if Error is part of pre-defined methods
	if (error instanceof ApiError) {
		res.status(error.code).json(error.message);
		return;
	} else {
		console.error(error);
		res.status(500).json({
			message: "Oops! Something went wrong - Please try again later",
		});
	}
}

module.exports = apiErrorHandler;
