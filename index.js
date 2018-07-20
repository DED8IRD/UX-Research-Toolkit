// Express application
const express = require('express'); // Use CommonJS modules
const passport = require('passport');
const googleOAuthStrategy = require('passpor t-google-oauth').OAuth2Strategy;
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
app.get(
	'/', 
	(req, res) => {
		res.send({ hello: 'world!' });
	}
);

app.get(
	'/auth/google/', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
