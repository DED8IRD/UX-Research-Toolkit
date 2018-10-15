<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Set up production environment](#set-up-production-environment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Set up production environment 
Since we wrapped up the OAuth segment, now's a great time to deploy! 

```
> git push heroku 
```

When you try to access your site, you should get this error: `Error: Cannot find module './config/keys'`. This is because we've configured our `.gitignore` to ignore our secret dev keys, *as we should*. 

We should instead set up our **production environment** with its own database, Google app, and secret keys. 

Note that these are the same steps we've done earlier for our dev environment.

## Create new MongoDB deployment 
1. Log in to [mlab.com] and create a new MongoDB deployment. 
2. Select **Sandbox** for the free plan (like we've done earlier). 
3. Create a new user.

## Create new Google app
1. Go to [console.developers.google.com] and create a new project.
2. Enable Google+ API.
3. Generate new OAuth credentials.
	- Set the `authorized JavaScript origins` and `authorized redirect origins` to your Heroku endpoints.

## Configure `keys.js` for dev and prod environments
We want `keys.js` to check which environment it's in: 
- **development**: use the hardcoded keys we already set up.
- **production**: extract keys from **environment variables**

1. Create a new file `./config/dev-keys.js`
	- Cut and paste the contents of `./config/keys.js` here.

2. Create a new file `./config/prod-keys.js`
	- Paste the contents of `./config/dev-keys.js` here but delete the values of all the keys.
	- Replace the values with **environment variables**.
```js 
// Production keys -- commit 
module.exports = {
	google: {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,		
	},
	mongo: {
		URI: process.env.MONGO_URI,
	},
	session: {
		cookieKey: process.env.COOKIE_KEY
	} 
}
```

3. Modify `./config/keys.js` to extract keys according to environment mode
```js 
// Determine environment and extract keys -- commit
if (process.env.NODE_ENV === "production") {
	// extract keys from environment variables
	module.exports = require("./prod-keys");
} else {
	// extract keys from hardcoded secret file
	module.exports = require("./dev-keys");
}
```

4. Modify `.gitignore` to ignore only `dev-keys.js`

## Set up environment variables
1. Go to [heroku.com] and select your app.
2. Go to **Settings > Config Vars**
3. Add your production keys
4. Push to Heroku 
```
> git push heroku 
```

