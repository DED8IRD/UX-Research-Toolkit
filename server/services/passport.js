// PassportJS configuration
const passport = require("passport");
const mongoose = require("mongoose");
const googleOAuthStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("../config/keys");

const User = mongoose.model("User");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => done(null, user));
});

passport.use(
	new googleOAuthStrategy(
		{
			clientID: keys.google.clientID,
			clientSecret: keys.google.clientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id })
			.then(existingUser => {
				// If authorized user exists in database, query database for user's info
				if (existingUser) {
					console.log('Existing user')
					console.log(existingUser)
					done(null, existingUser);
				
				// Else create new user
				} else {
					console.log('Creating new user')
					new User({
						googleID: profile.id
					}).save()
					.then(newUser => done(null, newUser));
				}
			});
		}
	)
);
