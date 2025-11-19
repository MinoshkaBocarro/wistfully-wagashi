const { db } = require("../config/db");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

module.exports = {
	// Find duplicate user
	async findUser(email) {
		// Store document query
		const usersRef = db.collection("users");
		const snapshot = await usersRef.get();

		let users = [];
		snapshot.forEach((doc) => {
			// TODO: Refactor
			users.push({
				id: doc.id,
				username: doc.data().username,
				email: doc.data().email,
				password: doc.data().password,
				isAdmin: doc.data().isAdmin,
			});
		});

		// Check for match
		const userMatch = users.filter((user) => user.email === email);

		return userMatch;
	},

	// Hash password
	async hashPassword(password) {
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(password, salt);

		return hashPassword;
	},

	// Generate the payload for the token
	async userDetailsToJSON(id) {
		// TODO: Refactor
		const usersRef = db.collection("users");

		const user = await usersRef.doc(id).get();
		const userJSON = _.omit({ id: id, ...user.data() }, "password");
		return userJSON;
	},

	// Mine the token
	jwtSignUser(user) {
		const payload = user;
		const secret = config.authentication.jwtSecret;
		const tokenExpireTime = 60;
		//  * 60 * 24;

		const token = jwt.sign(payload, secret, {
			expiresIn: tokenExpireTime,
		});
		return token;
	},

	async comparePassword(password, dbPassword) {
		const passwordMatch = await bcrypt.compare(password, dbPassword);

		return passwordMatch;
	},
};
