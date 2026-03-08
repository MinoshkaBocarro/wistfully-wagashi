// Imports packages
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const fileUpload = require("express-fileupload");

// Setup config
require("dotenv").config();
const config = require("./config/config");

// Setup cors
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

// Import routes
const routes = require("./routes/routes");

// Error handler
const ApiError = require("./utilities/ApiError");
const apiErrorHandler = require("./middleware/apiErrorHandler");

// Custom debug logs
const startLog = require("debug")("app:startup");
const { dbPing } = require("./config/db");

// Express instance
const app = express();
app.use(helmet());
app.use(cors(corsOptions));

// Default middleware for parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({ createParentPath: true }));

// Dev morgan output
app.use(morgan("dev"));

// Express endpoint
startLog("Accessing endpoints under /api ...");
app.use("/api", routes());

// Error handlers
// 404 NOT Found
app.use((req, res, next) => {
	next(ApiError.notFound());
});

// 400s and 500s
app.use(apiErrorHandler);
dbPing.then(() => {
	app.listen(config.port);
});
