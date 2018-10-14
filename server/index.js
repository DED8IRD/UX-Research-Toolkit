// Express application
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
const keys = require("./config/keys");
const userAuthRoutes = require("./routes/userAuthRoutes");
require("./models/User");

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());
require("./services/passport");

// Connect MongoDB instance
mongoose.connect(keys.mongoURI);
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
