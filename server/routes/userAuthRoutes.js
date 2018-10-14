// User authentication routes
const passport = require('passport');

module.exports = (app) => {
	// Google
	// authenticate
	app.get(
		'/auth/google', 
		passport.authenticate('google', {
			scope: ['profile', 'email']
		})
	);

	// callback
	app.get(
		'/auth/google/callback', 
		passport.authenticate('google')
	);
};