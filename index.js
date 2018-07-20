// Express application
const express = require('express'); // Use CommonJS modules
const passport = require('passport');
const googleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require('./config/keys');

const app = express();

passport.use(new googleOAuthStrategy(
	{
		clientID: keys.googleClientID,
		clientSecret: keys.googleClientSecret,
		callbackURL: '/auth/google/callback'
	},
	accessToken => {
		console.log(accessToken);
	}
));

// Route handlers
// Home
app.get(
	'/', 
	(req, res) => {
		res.send({ hello: 'world!' });
	}
);

// Google OAuth authenticate
app.get(
	'/auth/google', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

// Google OAuth callback
app.get(
	'/auth/google/callback', 
	passport.authenticate('google')
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
