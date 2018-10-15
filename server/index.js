// Express application
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();
const keys = require("./config/keys");
const userAuthRoutes = require("./routes/userAuthRoutes");
require("./models/User");

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");

// Set up session cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in ms
		keys: [keys.session.cookieKey]
	})
);

// Connect MongoDB instance
mongoose.connect(keys.mongo.URI);
mongoose.Promise = global.Promise;

// Route handlers
// Home
app.get("/", (req, res) => {
	res.send({ hello: "world!" });
});

// Auth routes
userAuthRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
