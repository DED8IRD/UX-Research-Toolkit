// Express application 
const express = require('express'); // Use CommonJS modules
const app = express();

// Route handlers
app.get('/', (req, res) => {
	res.send({hello: 'world!'});
});

app.listen(5000);