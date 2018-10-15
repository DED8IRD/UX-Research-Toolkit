<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Enable Cookies to Store User Sessions](#enable-cookies-to-store-user-sessions)
  - [Sessions](#sessions)
      - [Serialize User](#serialize-user)
      - [Deserialize User](#deserialize-user)
  - [Feature Flow](#feature-flow)
      - [PassportJS handles steps 2-5](#passportjs-handles-steps-2-5)
      - [MongoDB/Mongoose database for steps 6-7](#mongodbmongoose-database-for-steps-6-7)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Enable Cookies to Store User Sessions

So far, we have set up [steps 1-6 of UXTK's feature flow](#feature-flow). To complete step 7, we need to enable cookies and sessions. 

## Sessions
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

## Enable Cookies Using Cookie-Session
We're going to use a helper library called `cookie-session` to generate cookies to manage user authentication.

```
> yarn add cookie-session 
// OR 
> npm install cookie-session
```

In `index.js`:
```
const cookieSession = require("cookie-session");
...
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,  // 30 days in ms
	keys: [keys.cookieKey]
}));
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

