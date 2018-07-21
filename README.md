# User management with OAuth: PassportJS

**Table of Contents**  
  - [What is PassportJS?](#what-is-passportjs)
    - [Passport Strategies](#passport-strategies)
  - [Set up Passport and Google OAuth](#set-up-passport-and-google-oauth)
    - [Install Passport](#install-passport)
    - [Install Google OAuth Strategy](#install-google-oauth-strategy)
    - [Use Strategy](#use-strategy)
      - [Set up Google application and get credentials](#set-up-google-application-and-get-credentials)
      - [Import Passport and Google Strategy](#import-passport-and-google-strategy)
      - [To use a strategy](#to-use-a-strategy)
  - [Feature Flow](#feature-flow)
      - [PassportJS handles steps 2-5](#passportjs-handles-steps-2-5)

We're going to be a library to help us streamline some of the processes we outlined in our feature flow: [PassportJS](http://www.passportjs.org/).

Steps 2-5 of our [feature flow](#feature-flow) will be handled with PassportJS.

## What is PassportJS?
Passport is authentication middleware for Node that allows you to easily implement third-party sign in authentication, such as logging in through a user's Google, FaceBook, or Twitter accounts.

### Passport Strategies
Each type of third-party authentication provider (e.g. Google is one provider, FaceBook another) has its own **strategy**. This strategy is its own library that you set up with PassportJS.

If you want your app to have multiple types of authentication (e.g. Google *and* FaceBook), you will need to install *multiple strategies*.

UXTK is only going to have one strategy: Google.

## Set up Passport and Google OAuth
### Install Passport
```
> yarn add passport
// OR 
> npm install passport
```

### Install Google OAuth Strategy
```
> yarn add passport-google-oauth
// OR
> npm install passport-google-oauth
```

### Use Strategy
#### Set up Google application and get credentials
To use the Passport Google OAuth strategy, we need to first set up a Google app. 

1. Head to <https://console.developers.google.com> and create a new project.
2. Enable Google Plus API
	- Note: There is no Google OAuth API, what you want is actually contained in the Google+ API
3. Create new API credential
	- Click on **Credentials** in the sidebar. 
	- Select **OAuth client ID** as the type of credential.
	- Configure consent screen
		- The only required field is **product name**. You can configure the other fields later on.
	- Select **web application** for application type.
	- Under **Restrictions**:
		- Enter `http://localhost:5000` for **authorized JavaScript origins**.
		- Enter `http://localhost:5000/auth/google/callback` for **authorized redirect URIs** 

Step 3 should give you your application's:
- **clientID**: public token that identifies our application to the API
- **clientSecret**: private token (do not publish this!)

To keep these keys secret, you should store them in a separate JavaScript file and export them. Make sure to configure `.gitignore` to ignore any files containing secret keys.

Example of `./config/keys.js`:
```js
module.exports = {
	googleClientID: 'your-client-id-token',
	googleClientSecret: 'your-client-secret-key'
}
```

#### Import Passport and Google Strategy
To use Passport and Google OAuth, we need import them into our Express app.

In `index.js`:
```js
const passport = require("passport");
const googleOAuthStrategy = require('passport-google-oauth').OAuth2Strategy;
const keys = require("./config/keys");
```

#### To use a strategy
`passport.use()` takes a strategy instance. The strategy instance takes two arguments: 

1. An object with three required parameters:

  	- clientID 
  	- clientSecret
  	- callbackURL

2. Verify callback with four parameters:
	- accessToken
	- refreshToken
	- profile
	- done

In `index.js`:
 ```js
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
  }
));
```

Now that we have set up our strategy, let's hook it up to some routes. Create a route handler for http://localhost:5000/auth/google

In `index.js`:
```js
// Google OAuth authenticate
app.get(
	'/auth/google', 
	passport.authenticate('google', {
		scope: ['profile', 'email']
	})
);
```
We can see that the second parameter for our route handler is a Passport method `passport.authenticate()`. We're telling our passport instance that the provider strategy we are calling is Google, and the information we want to access are a user's profile and email.

At this point, if you run your server and try to access <http://localhost:5000/auth/google/>, you should get redirected to Google's sign in screen. 
When you select an account, you will get redirected to a page with a 404 and this error message: `Cannot GET /auth/google/callback`.

This makes perfect sense, we haven't actually created a route handler for `/auth/google/callback` yet, so let's go ahead and do that.

In `index.js`:
```js
// Google OAuth callback
app.get(
	'/auth/google/callback', 
	passport.authenticate('google')
);
```

Restart your server, and try to access <http://localhost:5000/auth/google/> again. When you select an account, you'll find that it stalls onscreen. However, if you open your terminal, you'll find that our verify callback parameters are logged. 

Recall the following line in `passport.use()` in `index.js`:
```js
  (accessToken, refreshToken, profile, done) => {
    console.log('accessToken: ', accessToken);
    console.log('refreshToken: ', refreshToken);
    console.log('profile: ', profile);
  }
```

Although the app stalls, we're successfully accessing the user's accessToken and profile information. This means that everything is connecting! Note that we aren't actually handling any of the user information yet. We are midway through step four in the [feature flow](#passportjs-handles-steps-2-5).

Let's consider this a stopping point. We'll continue onwards in the next section, where we actually create a database entry representing the user and handle user authentication within our app.

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

6. **Create record in MongoDB database using user information returned by Google.**
7. **Set userid in cookie for this user and redirect them back to homepage.** The user is logged in and authenticated now.

After the user is logged in, we can handle API calls from valid users.

8. User sends request to API. Cookie is automatically included.
9. **We handle the requests and return responses based on request and whether the user is authorized.**

