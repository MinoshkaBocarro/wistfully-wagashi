const { db } = require("../config/db");
const ApiError = require("../utilities/ApiError");
const {
	findUser,
	hashPassword,
	userDetailsToJSON,
	jwtSignUser,
	comparePassword,
} = require("../utilities/authServices");

module.exports = {
	// List Users
	async listUsers(req, res, next) {
		try {
			// Store document query
			const usersRef = db.collection("users");
			const snapshot = await usersRef.get();

			// 400 Error: Check for no documents
			if (snapshot.empty) {
				return next(
					ApiError.badRequest("No users exist for this collection")
				);
			}

			// Structure the snapshot so it returns valid array of docs
			let users = [];
			snapshot.forEach((doc) => {
				users.push({
					id: doc.id,
					username: doc.data().username,
					email: doc.data().email,
					isAdmin: doc.data().isAdmin,
				});
			});

			res.send(users);
		} catch (error) {
			return next(
				ApiError.internal("The users could not be found", error)
			);
		}
	},

	// Register Users
	async register(req, res, next) {
		try {
			// Assign the credentials POST data to local variables
			const { username, email, password } = req.body;

			// Validate user data: Block duplicate emails
			const userMatch = await findUser(email);

			if (userMatch.length > 0) {
				return next(ApiError.badRequest("This email already exists"));
			}

			// Save the new user to db
			const usersRef = db.collection("users");
			const response = await usersRef.add({
				username,
				email,
				password: await hashPassword(password),
				isAdmin: false,
			});
			console.log(`User: ${response.id} registered`);

			// Structure the data payload to be saved within the token
			const userJSON = await userDetailsToJSON(response.id);

			// Response: Send back a token on SUCCESS
			res.send({ token: jwtSignUser(userJSON) });
		} catch (error) {
			return next(
				ApiError.internal(
					"Your profile could not be registered at this time",
					error
				)
			);
		}
	},

	// Login Users
	async login(req, res, next) {
		// Save form data to local vars
		const { email, password } = req.body;

		// Check user is saved to the db already
		const userMatch = await findUser(email);

		if (!userMatch.length) {
			return next(
				// TODO: Remove debug
				ApiError.badRequest(
					"Incorrect email or password (DEBUG - email)"
				)
			);
		}

		// Check that the password matches the db user pwd
		const passwordMatch = await comparePassword(
			password,
			userMatch[0].password
		);

		if (!passwordMatch) {
			return next(
				// TODO: Remove Deubug
				ApiError.badRequest(
					"Incorrect email or password (DEBUG - password)"
				)
			);
		}

		// Dealing with response and minting token
		console.log(`Success - user created: ${userMatch[0].id}`);

		// TODO: refactor
		const userJSON = await userDetailsToJSON(userMatch[0].id);

		res.send({ token: jwtSignUser(userJSON) });
	},
};
