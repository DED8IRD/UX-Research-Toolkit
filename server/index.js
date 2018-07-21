// Express application
const express = require('express'); // Use CommonJS modules
const userAuthRoutes = require('./routes/userAuthRoutes');
const app = express();
require('./services/passport');


// Route handlers
// Home
app.get(
	'/', 
	(req, res) => {
		res.send({ hello: 'world!' });
	}
);

// Auth routes
userAuthRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
