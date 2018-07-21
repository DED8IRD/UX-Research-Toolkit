// PassportJS configuration
const passport = require('passport');
const googleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('../config/keys');

passport.use(new googleOAuthStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	(accessToken, refreshToken, profile, done) => {
		console.log('accessToken: ', accessToken);
		console.log('refreshToken: ', refreshToken);
		console.log('profile: ', profile);
		console.log('done: ', done);
	}
));
