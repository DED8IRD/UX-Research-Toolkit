# Refactor Server Code

So far we have all of our logic within one file: `index.js`. In this section, we will refactor our backend code into more organized, modular pieces. 

Our Express app will have this general structure:

		/server/
		├── /config/ (Protected API keys and settings)
		├── /routes/ (Route handlers grouped by purpose)
		├── /services/ (Helper modules and application logic)
		└── index.js (Imports modules above)

In this section, you will refactor portions of `index.js` into two new files and import them back into `index.js`: 
1. `./routes/userAuthRoutes.js` - contains auth routes
2. `./services/passport.js` - contains passport configuration

Your resulting structure should look something like this:

		/server/
		├── /config/ 
		│   └── keys.js
		├── /routes/ 
		│   └── userAuthRoutes.js
		├── /services/ 
		│   └── passport.js
		└── index.js 

