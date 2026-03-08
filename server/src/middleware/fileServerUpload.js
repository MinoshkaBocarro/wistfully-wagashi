const ApiError = require("../utilities/ApiError");
const path = require("path");
const debugWRITE = require("debug")("app;post");

const fileServerUpload = (req, res, next) => {
	if (req.files) {
		// Store file (single)
		const file = req.files.image;
		debugWRITE(`Image for Sever Processing: ${file.name}`);

		// Append unique filename extension
		const filename = Date.now() + "_" + file.name;
		debugWRITE(`Unique filename: ${filename}`);

		// Declare server storage directory path
		const uploadPath = path.join(
			__dirname,
			"../../public/uploads/",
			filename,
		);

		// Move file to server storage
		file.mv(uploadPath)
			.then(() => {
				// Set filename variable on req object and pass to next middleware
				res.locals.filename = filename;
				next();
			})
			.catch((error) => {
				if (error)
					return next(
						ApiError.internal(
							"Your file request could not be processed at this time",
							error,
						),
					);
			});
	} else {
		next();
	}
};

module.exports = fileServerUpload;
