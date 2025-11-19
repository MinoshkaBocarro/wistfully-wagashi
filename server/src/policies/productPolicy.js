// Import Joi Validation module
const Joi = require("joi");
const ApiError = require("../utilities/ApiError");
const debugJoi = require("debug")("app:joi");

module.exports = {
	// POST Validation
	validateProduct(req, res, next) {
		const schema = Joi.object({
			productName: Joi.string().min(3).max(50).required(),
			description: Joi.string().min(3).max(2000).required(),
			category: Joi.string().required(),
			price: Joi.number().required(),
			dietaryInformation: Joi.string().min(3).max(50).required(),
			weight: Joi.number().required(),
			onSale: Joi.boolean().required(),
			isAvailable: Joi.boolean().required(),
			image: Joi.any(),
			oldImageId: Joi.string().optional(),
		});

		const { error, value } = schema.validate(req.body);

		// Validation Error: Error middleware with dynamic validation error message
		if (error) {
			debugJoi(error);
			switch (error.details[0].context.key) {
				case "productName":
					next(
						ApiError.badRequest(
							"You must provide a valid name for the product"
						)
					);
					break;

				case "description":
				case "category":
				case "dietaryInformation":
				case "weight":
					next(
						ApiError.badRequest(
							"You must provide a valid product information including description, category, dietaryInformation and/or weight"
						)
					);
					break;

				case "price":
					next(
						ApiError.badRequest(
							"You must provide valid pricing for the product"
						)
					);
					break;

				case "onSale":
				case "isAvailable":
					next(
						ApiError.badRequest(
							"You must check whether the product is on sale and/or stock remains available for purchase"
						)
					);
					break;

				case "uploadedFile":
					next(
						ApiError.badRequest(
							"The existing image URL or path are not in a valid format - please re-upload the image"
						)
					);
					break;

				default:
					next(
						ApiError.badRequest(
							"Invalid Form Information - please check form information and submit again"
						)
					);
			}
		} else {
			next();
		}
	},
};
