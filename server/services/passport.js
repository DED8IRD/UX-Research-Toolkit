// PassportJS configuration
const passport = require("passport");
const mongoose = require("mongoose");
const googleOAuthStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});

passport.use(
	new googleOAuthStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "/auth/google/callback"
		},
		async (accessToken, refreshToken, profile, done) => {
			const existingUser = await User.findOne({ googleID: profile.id });
			// If authorized user exists in database, query database for user's info
			if (existingUser) {
				console.log("Existing user");
				console.log(existingUser);
				done(null, existingUser);

			// Else create new user
			} else {
				console.log("Creating new user");
				const newUser = await new User({
					googleID: profile.id
				}).save();
				done(null, newUser);
			}
		}
	)
);
