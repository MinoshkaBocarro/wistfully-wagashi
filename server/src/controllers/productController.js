const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");
const {
	cloudinaryImageUpload,
	cloudinaryDeleteImage,
	getFileIdFromUrl,
} = require("../lib/cloudinaryImageUploadService");

const debugREAD = require("debug")("app:read");
const debugWRITE = require("debug")("app:write");

module.exports = {
	// GET ALL Products
	async getAllProducts(req, res, next) {
		try {
			// Store document query
			const productRef = db.collection("products");
			const snapshot = await productRef
				.where("isAvailable", "==", true)
				.orderBy("price", "asc")
				.limit(10)
				.get();

			// 400 Error: Check for no documents
			if (snapshot.empty) {
				return next(
					ApiError.badRequest(
						"The documents you were looking for do not exist",
					),
				);
			}

			// Structure the snapshot so it returns valid array of docs
			let docs = [];
			snapshot.forEach((doc) => {
				docs.push({
					id: doc.id,
					productName: doc.data().productName,
					description: doc.data().description,
					image: doc.data().image,
					category: doc.data().category,
					weight: doc.data().weight,
					dietaryInformation: doc.data().dietaryInformation,
					price: doc.data().price,
					onSale: doc.data().onSale,
					isAvailable: doc.data().isAvailable,
				});
			});

			res.send(docs);
		} catch (error) {
			return next(
				ApiError.internal(
					"The items selected could not be found",
					error,
				),
			);
		}
	},

	// GET ALL SALE Products
	async getAllSaleProducts(req, res, next) {
		try {
			// Store document query
			const userRef = db.collection("products");
			// Get all products that are on sale ordered from lowest price to most expensive
			const snapshot = await userRef
				.where("isAvailable", "==", true)
				.where("onSale", "==", true)
				.orderBy("price", "asc")
				.limit(10)
				.get();

			// 400 Error: Check for no documents
			if (snapshot.empty) {
				return next(
					ApiError.badRequest(
						"The documents you were looking for do not exist",
					),
				);
			}

			// Structure the snapshot so it returns valid array of docs
			let docs = [];
			snapshot.forEach((doc) => {
				docs.push({
					id: doc.id,
					productName: doc.data().productName,
					description: doc.data().description,
					image: doc.data().image,
					category: doc.data().category,
					weight: doc.data().weight,
					dietaryInformation: doc.data().dietaryInformation,
					price: doc.data().price,
					onSale: doc.data().onSale,
					isAvailable: doc.data().isAvailable,
				});
			});

			res.send(docs);
		} catch (error) {
			return next(
				ApiError.internal(
					"The items selected could not be found",
					error,
				),
			);
		}
	},

	// POST Product
	async postProduct(req, res, next) {
		let downloadUrl;

		try {
			// Image upload to Cloudinary
			const filename = res.locals.filename;

			const uploadResult = await cloudinaryImageUpload(filename);
			downloadUrl = uploadResult.data.url;
		} catch (error) {
			return next(
				ApiError.internal(
					"An error occurred in uploading the image to storage",
					error,
				),
			);
		}

		try {
			const productRef = db.collection("products");
			const response = await productRef.add({
				productName: req.body.productName,
				description: req.body.description,
				category: req.body.category,
				weight: Number(req.body.weight),
				dietaryInformation: req.body.dietaryInformation,
				price: Number(req.body.price),
				onSale: req.body.onSale === "true",
				isAvailable: req.body.isAvailable === "true",
				image: downloadUrl,
			});

			res.send(response.id);
		} catch (error) {
			return next(
				ApiError.internal(
					"Your request could not be saved at this time",
					error,
				),
			);
		}
	},

	// GET Product BY ID
	async getProductById(req, res, next) {
		try {
			// Store doc query
			const productRef = db.collection("products").doc(req.params.id);
			const doc = await productRef.get();

			// Error 400: Where doc doesn't exist
			if (!doc.exists) {
				return next(
					ApiError.badRequest(
						"The item you were looking for does not exist",
					),
				);
			}

			res.send(doc.data());
		} catch (error) {
			return next(
				ApiError.internal(
					"Your request could not be processed at this time",
					error,
				),
			);
		}
	},

	async putProductById(req, res, next) {
		let downloadUrl;

		try {
			// Overwriting the old image with new image
			if (req.files) {
				// Upload the new image
				const filename = res.locals.filename;

				const uploadResult = await cloudinaryImageUpload(filename);
				downloadUrl = uploadResult.data.url;
				// Delete the old image
				if (req.body.oldImageId) {
					const deleteResult = await cloudinaryDeleteImage(
						req.body.oldImageId,
					);
				}
			} else if (req.body.image === "undefined") {
				next(ApiError.badRequest("You must provide an image"));
			} else {
				// Image is not changed
				downloadUrl = req.body.image;
			}
		} catch (error) {
			return next(
				ApiError.internal(
					"An error occurred in saving image to storage",
					error,
				),
			);
		}

		// Update the document in firestore
		try {
			const productRef = db.collection("products").doc(req.params.id);
			const response = await productRef.update({
				productName: req.body.productName,
				description: req.body.description,
				category: req.body.category,
				weight: Number(req.body.weight),
				dietaryInformation: req.body.dietaryInformation,
				price: Number(req.body.price),
				onSale: req.body.onSale === "true",
				isAvailable: req.body.isAvailable === "true",
				image: downloadUrl,
			});
			res.send(response);
		} catch (error) {
			return next(
				ApiError.internal(
					"Your request could not be saved at this time",
					error,
				),
			);
		}
	},

	async deleteProductById(req, res, next) {
		try {
			// Store doc query
			const productRef = db.collection("products").doc(req.params.id);
			const doc = await productRef.get();

			// Error 400: Where doc doesn't exist
			if (!doc.exists) {
				return next(
					ApiError.badRequest(
						"The item you were looking for does not exist",
					),
				);
			}

			// Store the downloadUrl from the doc + obtain the oldImageId for deletion
			const downloadUrl = doc.data().image;
			const oldImageId = getFileIdFromUrl(downloadUrl);
			const deleteResult = await cloudinaryDeleteImage(oldImageId);

			// Test image delete result and IF TRUE delete the firestore doc
			if (deleteResult.success) {
				const response = await productRef.delete({ exists: true });
				// precondition: double check to prevent hard error
				res.send(response);
			}
		} catch (error) {
			return next(
				ApiError.internal(
					"Your request could not be processed at this time",
					error,
				),
			);
		}
	},
};
