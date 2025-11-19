// Import libraries
const admin = require("firebase-admin");
const cloudinary = require("cloudinary").v2;

const config = require("./config");

const dbStartup = require("debug")("app:db");
const debugError500 = require("debug")("app:error");

try {
	dbStartup("Attempting db connection");
	const serviceAccountKey = config.db.serviceAccountKey;

	const firebaseAppOptions = {
		credential: admin.credential.cert(serviceAccountKey),
	};

	// Call the Firestore database with options
	admin.initializeApp(firebaseAppOptions);
	const db = admin.firestore();

	// Configure Cloudinary Credentials
	const cloudinaryAppCredentials = {
		cloud_name: config.cloudinary.cloud_name,
		api_key: config.cloudinary.api_key,
		api_secret: config.cloudinary.api_secret,
	};

	// Config Cloudinary with credentials
	cloudinary.config(cloudinaryAppCredentials);

	// Initialise Cloudinary uploader
	const cloudUploader = cloudinary.uploader;

	// "Ping test" Function (only use in development)
	const dbPing = db.listCollections().then((collections) => {
		dbStartup("Connected to Cloud Firestore");
		for (let collection of collections) {
			dbStartup(`Found db collection: ${collection.id}`);
		}
	});

	module.exports = { db, dbPing, cloudUploader };
} catch (error) {
	debugError500(error);
}
