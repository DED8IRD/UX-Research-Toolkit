<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Finish Login, Logout, and Redirect](#finish-login-logout-and-redirect)
  - [Redirect](#redirect)
  - [Logout](#logout)
  - [Feature Flow](#feature-flow)
      - [PassportJS handles steps 2-5](#passportjs-handles-steps-2-5)
      - [MongoDB/Mongoose database for steps 6-7](#mongodbmongoose-database-for-steps-6-7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Finish Login, Logout, and Redirect
This is the final portion of the OAuth section. 

## Redirect 
If you run your app, you should see an error like this: `Cannot GET /auth/google/callback`. This is because we haven't set up a response for OAuth authentication. To fix this, we can define a callback function or specify redirect paths.

Let's specify redirect paths for successful and failed authentication in our callback route. Pass in an object with your desired `successRedirect` and `failureRedirect` as the second argument in `passport.authenticate()`

In `./routes/userAuthRoutes.js`:
```js
// callback
app.get(
	'/auth/google/callback', 
	passport.authenticate('google', {
		successRedirect: '/profile',
		failureRedirect: '/auth/google'
	})
);
```

## Logout 
Logging out is very simple with PassportJS. Passport exposes a `logout()` function on `req`  that can be called from any route handler.  Calling `logout()` will remove the `req.user` property and clear the login session (if any).

In `./routes/userAuthRoutes.js`:
```js
app.get(
	'/auth/logout',
	(req, res) => {
		req.logout()
		res.send("You are logged out.")
	}
)
```

This completes the OAuth section. This will be the same process you'll take to set up OAuth with PassportJS and Express in just about any web app. You can repeat this process with other strategies, such as FaceBook OAuth. 

In the next section, we will set up our production environment and push our changes to our Heroku deployment. 


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

