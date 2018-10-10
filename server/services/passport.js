// PassportJS configuration
const passport = require("passport");
const mongoose = require("mongoose");
const googleOAuthStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.use(
	new googleOAuthStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback"
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then((existingUser) => {
				// If authorized user exists in database, query database for user's info
				if (existingUser) {

				// Else create new user
				} else { 
					new User({
						googleID: profile.id
					}).save();
				}
			})
		}
	)
);
