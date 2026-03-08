module.exports = {
	// Port Envs
	port: process.env.PORT,

	// Database Envs
	db: {
		serviceAccountKey: {
			type: process.env.SERVICE_ACCOUNT_KEY_TYPE,
			project_id: process.env.SERVICE_ACCOUNT_KEY_PROJECT_ID,
			private_key_id: process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY_ID,
			private_key: process.env.SERVICE_ACCOUNT_KEY_PRIVATE_KEY,
			client_email: process.env.SERVICE_ACCOUNT_KEY_CLIENT_EMAIL,
			client_id: process.env.SERVICE_ACCOUNT_KEY_CLIENT_ID,
			auth_uri: process.env.SERVICE_ACCOUNT_KEY_AUTH_URI,
			token_uri: process.env.SERVICE_ACCOUNT_KEY_TOKEN_URI,
			auth_provider_x509_cert_url:
				process.env.SERVICE_ACCOUNT_KEY_AUTH_PROVIDER,
			client_x509_cert_url:
				process.env.SERVICE_ACCOUNT_KEY_CLIENT_CERT_URL,
			universe_domain: process.env.SERVICE_ACCOUNT_KEY_UNIVERSE_DOMAIN,
		},
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
