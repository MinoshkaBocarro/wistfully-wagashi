const Joi = require("joi");
const ApiError = require("../utilities/ApiError");
const debugJoi = require("debug")("app:joi");

module.exports = {
	validateAuth(req, res, next) {
		debugJoi(req.body);
		const schema = Joi.object({
			username: Joi.string().alphanum().min(3).max(50),
			email: Joi.string()
				.email({
					minDomainSegments: 2,
					tlds: { allow: ["com", "net"] },
				})
				.required(),
			password: Joi.string()
				.pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
				.required(),
		});

		// Call the validate function to potentially return errors for bad data
		const { error, value } = schema.validate(req.body);

		// Check for error and what it is
		if (error) {
			debugJoi(error.details[0].context);
			switch (error.details[0].context.key) {
				case "username":
					next(
						ApiError.badRequest("You must provide a valid username")
					);
					break;
				case "email":
					next(ApiError.badRequest("You must provide a valid email"));
					break;

				case "password":
					next(
						ApiError.badRequest("You must provide a valid password")
					);
					break;

				default:
					next(
						ApiError.badRequest(
							"Invalid form information - please check and submit again later"
						)
					);
			}
		} else {
			// If the data is good, pass to the next middleware
			next();
		}
	},
};
