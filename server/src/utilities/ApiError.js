const debugError500 = require("debug")("app:error500");

class ApiError {
	constructor(code, message, error) {
		this.code = code;
		this.message = message;
		this.error = error;
	}

	// 400 Bad Request
	static badRequest(msg) {
		return new ApiError(400, `Bad Request: ${msg}`);
	}

	// 401 Unauthorised
	static denyAccess(msg) {
		return new ApiError(401, `Access Denied ${msg}`);
	}

	// 403 Forbidden
	static forbidden(msg) {
		return new ApiError(403, `Access Denied: ${msg}`);
	}

	// 404 Not Found
	static notFound() {
		return new ApiError(404, "Resource not found");
	}

	// 413 Content too large
	static tooLarge(msg) {
		return new ApiError(413, `Upload failed: ${msg}`);
	}

	// 422 Unprocessable Content
	static cannotProcess(msg) {
		return new ApiError(422, `Upload failed: ${msg}`);
	}

	// 500 Internal Server Error
	static internal(msg, error) {
		// TODO: Change for production (e.g. Internal Server Error: Please come back later)
		debugError500(error);
		return new ApiError(500, `Internal Server Error ${msg}`);
	}
}

module.exports = ApiError;
