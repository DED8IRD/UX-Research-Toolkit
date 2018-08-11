// PassportJS configuration
const passport = require('passport');
const mongoose = require('mongoose');
const googleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../config/keys');

const User = mongoose.model('user');

passport.use(new googleOAuthStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		new User({
			'googleID': profile.id
		}).save();
	}
));
