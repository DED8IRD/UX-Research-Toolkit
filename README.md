# User management with OAuth: PassportJS

We're going to be a library to help us streamline some of the processes we outlined in our feature flow: [PassportJS](http://www.passportjs.org/).

Steps 2-5 of our [feature flow](#feature-flow) will be handled with PassportJS.

### What is PassportJS?
Passport is authentication middleware for Node that allows you to easily implement third-party sign in authentication, such as logging in through a user's Google, FaceBook, or Twitter accounts.

#### Passport Strategies
Each type of third-party authentication provider (e.g. Google is one provider, FaceBook another) has its own **strategy**. This strategy is its own library that you set up with PassportJS.

If you want your app to have multiple types of authentication (e.g. Google *and* FaceBook), you will need to install *multiple strategies*.

UXTK is only going to have one strategy: Google.

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

