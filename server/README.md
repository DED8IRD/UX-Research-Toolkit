<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [MongoDB](#mongodb)
    - [Database-as-a-Service](#database-as-a-service)
    - [Install Mongoose](#install-mongoose)
    - [Connect Mongoose to MongoDB](#connect-mongoose-to-mongodb)
    - [Create User Collection](#create-user-collection)
    - [Create User Record](#create-user-record)
    - [Check if User Exists in Database](#check-if-user-exists-in-database)
    - [Call `done()` to Complete Authentication](#call-done-to-complete-authentication)
    - [Serialize User](#serialize-user)
    - [Deserialize User](#deserialize-user)
  - [Feature Flow](#feature-flow)
      - [PassportJS handles steps 2-5](#passportjs-handles-steps-2-5)
      - [MongoDB/Mongoose database for steps 6-7](#mongodbmongoose-database-for-steps-6-7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# MongoDB

So far, we have set up [steps 1-5 of UXTK's feature flow](#feature-flow). To complete step 6, we need to set up MongoDB. 

We're going to use a tool called [Mongoose](http://mongoosejs.com/docs/) to help us.

To use MongoDB, you can either install a local database or use a remote hosting service. I'm using [mLab](https://mlab.com/) to host UXTK's database. 

### Database-as-a-Service
For this course, we will use [mLab](https://mlab.com/) to host our database, since it provides free hosting (up to 500mb total) for unlimited projects.

To use:
1. Set up an account 
4. Create a new MongoDB deployment
3. Add database user

### Install Mongoose
Once you have your database set up, make sure to install Mongoose.js next.
```
> yarn add mongoose 
// OR
> npm install mongoose
``` 

### Connect Mongoose to MongoDB
Import Mongoose and [connect to Mongo URI](https://docs.mlab.com/connecting/#connect-string).

In `index.js`:
```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://<dbuser>:<dbpassword>@your-mongo-uri.mlab.com')
```

Note that your Mongo URI should be a *secret*, so you should put it inside `./config/keys` and import it to `index.js`.
```js
const keys = require('./config/keys');
mongoose.connect(keys.mongoURI);
```

### Create User Collection
We're going to create a **Model Class** with Mongoose. This model class will represent a **User Collection** inside our MongoDB database.

To organize our models, create a new directory called `models/` inside `server/`. Create a new file for your User model `User.js`.

In `./models/User.js`:
```js
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define user schema using Object of <field:datatype> pairs
const userSchema = new Schema({
	googleID: String
});

// Create model class
mongoose.model('user', userSchema);
```

Inside `index.js`, make sure to require `User.js` to actually run the code and create the User model:
```js
require('./models/User');
```

### Create User Record
To create an actual **record** or User instance:
```js
const User = mongoose.model('user');
new User({ 'googleID': profile.id }).save();
```

### Check if User Exists in Database 
So far, every time a user logs in, a new user record is created. We only want to add a user record *once* when they first sign on. 

To fix this, we have to first check if the user exists in our database:

1. If user exists: return that user's data.
2. Else: create a new user record.

In `./services/passport.js`:
```js
passport.use(new googleOAuthStrategy(
	...,
	(accessToken, refreshToken, profile, done) => {
		// --- Insert logic here: ---
			// Query DB for user given the Google ID
			User.findOne({ googleID: profile.id })
			.then((existingUser) => {
				// If authorized user exists in database, query database for user's info
				if (existingUser) {
					...
				// Else create new user
				} else { 
					new User({
						googleID: profile.id
					}).save();
				}
			})		
		// --------------------------
	}
));
```

### Call `done()` to Complete Authentication
You probably noticed by this point that your application stalls. We know that we are successfully creating user instances by checking our user collection on mLab, but the web app itself stalls and eventually gives you an error.

We're missing a crucial step: we need to tell PassportJS when we complete our operation to continue the authentication process.

To do this, we need to call `done()`. We already included the `done` function as a parameter in our callback function: `(accessToken, refreshToken, profile, done) => {...}`

To call `done`, you need to pass in an error object and a record instance `done(err, record)`

In `./services/passport.js`:
```js
		User.findOne({ googleID: profile.id })
		.then((existingUser) => {
			// If authorized user exists in database, query database for user's info
			if (existingUser) {
				done(null, existingUser);
			// Else create new user
			} else { 
				new User({
					googleID: profile.id
				}).save()
				.then(newUser => done(null, newUser));
			}
		})		

```

### Sessions
Most web apps use cookies to persist login. This means that you only need to access the credentials necessary to authenticate a user (i.e. username and password, or in this case, third-party OAuth) during the login request. If the login is authenticated, a unique cookie is set in the user's browser to establish a  session. Each subsequent request the user makes will not contain credentials--instead, the request will pass the cookie identifying the user's current session.

To support login sessions, PassportJS **serializes** and **deserializes** user instances to and from the session. You'll need to define the following methods: `passport.serializeUser` and `passport.deserializeUser`.

These methods allow the user's data to be saved and retrieved from a session. 

In `./services/passport.js` before `passport.use(...)`:

#### Serialize User  
```js
passport.serializeUser((user, done) => {
	done(null, user.id);
});
```

#### Deserialize User 
```js
passport.deserializeUser((id, done) => {
	User.findById(id)
	.then(user => done(null, user));
});
```


## Feature Flow
This is what goes on when we implement Google OAuth.
The bolded steps are ones that we have to handle in writing our backend logic.

Steps 1-5 contain a 2-step verification process for the user and Google to authorize giving us a user's information. You can think of this like registering an account at a site and having to verify your email, except the 2-step portion happens behind the scenes to the user. 

1. User clicks sign in button

#### PassportJS handles steps 2-5
2. **This button click sends a request to our Google auth route handler. Our server redirects request to Google.**
3. Google asks user if they grant permission. If yes, Google redirects back to our Google auth route handler with a request token that is a 'key' to access the user's Google information.
4. **Put the user on hold, and send a request to Google with the request token**
5. If the token is accepted, Google responds back an access token. We can then *access* the user's information with the access token.

In steps 6-7, we handle the user information Google gives us to create a new record in our database and create a cookie for this user.

#### MongoDB/Mongoose database for steps 6-7
6. **Create record in MongoDB database using user information returned by Google.**
7. **Set userid in cookie for this user and redirect them back to homepage.** The user is logged in and authenticated now.

After the user is logged in, we can handle API calls from valid users.

8. User sends request to API. Cookie is automatically included.
9. **We handle the requests and return responses based on request and whether the user is authorized.**

