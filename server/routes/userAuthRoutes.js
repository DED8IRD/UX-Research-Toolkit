// User authentication routes
const passport = require('passport');

module.exports = (app) => {
	// Google
	// oauth login
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

	// logout
	app.get(
		'/auth/logout',
		(req, res) => {
			req.logout()
			res.send("You are logged out.")
		}
	)

	// user profile
	app.get(
		'/profile', 
		(req, res) => {
			res.send(req.user)
		} 
	);
};