module.exports = {
	// Port Envs
	port: process.env.PORT,

	// Database Envs
	db: {
		serviceAccountKey: process.env.GOOGLE_APPLICATION_CREDENTIALS,
	},

	// Auth Envs
	authentication: {
		jwtSecret: process.env.JWT_SECRET,
	},

	// Cors Envs
	corsAllowedOptions: [
		process.env.CORS_WHITELIST_1,
		// process.env.CORS_WHITELIST_2,
	],

	cloudinary: {
		cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
		api_key: process.env.ClOUDINARY_API_KEY,
		api_secret: process.env.ClOUDINARY_API_SECRET,
		root_upload_folder: process.env.CLOUDINARY_ROOT_UPLOAD_FOLDER,
	},
};
