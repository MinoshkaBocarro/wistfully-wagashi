// Config
const { cloudUploader } = require("../config/db");
const config = require("../config/config");

// Import packages
const uuid = require("uuid");
const fs = require("fs");
const debugBucket = require("debug")("app:bucket");

module.exports = {
	async cloudinaryImageUpload(filename) {
		try {
			// Set options for the upload
			const serverFilePath = `./public/uploads/${filename}`;

			const uploadOptions = {
				resource_type: "auto", // Automatically detect image/video/raw
				asset_folder: config.cloudinary.root_upload_folder,
				public_id: uuid.v4(),
				tags: ["product"],
			};

			// Request upload to cloudinary service
			const uploadResult = await cloudUploader.upload(
				serverFilePath,
				uploadOptions,
			);

			// Delete temporary file in server-side uploads
			fs.unlink(serverFilePath, (error) => {
				if (error) {
					debugBucket(error);
					return {
						message:
							"Error occurred in removing file from temporary local storage",
					};
				} else {
					debugBucket("File in temporary local storage deleted");
				}
			});

			return {
				success: true,
				data: {
					public_id: uploadResult.public_id,
					secure_url: uploadResult.secure_url,
					url: uploadResult.url,
					width: uploadResult.width,
					height: uploadResult.height,
					format: uploadResult.format,
					bytes: uploadResult.bytes,
					created_at: uploadResult.created_at,
				},
			};
		} catch (error) {
			console.error("Cloudinary upload error:", error);
			return {
				success: false,
				error: error.message || "Failed to upload image to Cloudinary",
			};
		}
	},

	getFileIdFromUrl(secureUrl) {
		try {
			// Find the position of '/upload/' in the URL
			const uploadIndex = secureUrl.indexOf("/upload/");

			// Get everything after '/upload/' and split by '/' to get uuid + public_id (latter we want!)
			const afterUpload = secureUrl.substring(uploadIndex + 8); // 8 = length of '/upload/'
			const parts = afterUpload.split("/");

			// Join all parts after the version (index 1) to reconstruct the full public_id
			const publicIdWithExtension = parts.slice(1).join("/");

			// Remove file extension by finding the last dot
			const lastDotIndex = publicIdWithExtension.lastIndexOf(".");
			const publicId = publicIdWithExtension.substring(0, lastDotIndex);

			return publicId;
		} catch (error) {
			console.error("Error extracting public_id from URL:", error);
			return null;
		}
	},

	async cloudinaryDeleteImage(publicId) {
		try {
			// Cue deletion of image via public id (from above fnc)
			const result = await cloudUploader.destroy(publicId, {
				resource_type: "image",
			});

			// Return simple success message
			return {
				success: result.result === "ok",
				data: result,
			};
		} catch (error) {
			console.error("Cloudinary delete error:", error);
			return {
				success: false,
				error:
					error.message || "Failed to delete image from Cloudinary",
			};
		}
	},
};
