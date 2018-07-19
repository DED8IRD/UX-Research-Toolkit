# User management with Google OAuth

We're going to be starting off with a very difficult task here. This is going to be the most difficult portion of this project. However, the skills you'll gain here will transfer over to many other projects, so it's definitely a worthwhile endeavor.

### What is OAuth?
We want our users to be able to sign up and sign in with their Google accounts rather than entering in their own email information. Since this project is UX minded, we might as well get that extra bit of UX in streamlining the registration process.

![Sign in with Google](../Google_OAuth_signup.png)




## Feature Flow
This is what goes on when we implement Google OAuth.
The bolded steps are ones that we have to handle in writing our backend logic.


Steps 1-5 contain a 2-step verification process for the user and Google to authorize giving us a user's information. You can think of this like registering an account at a site and having to verify your email, except the 2-step portion happens behind the scenes to the user. 

1. User clicks sign in button
2. **This button click sends a request to our Google auth route handler. Our server redirects request to Google.**
3. Google asks user if they grant permission. If yes, Google redirects back to our Google auth route handler with a 'code' parameter that is a 'key' to access the user's Google information.
4. **Put the user on hold, and send a request to Google with the user 'code'.**
5. If the code matches, Google responds back with user information.

In steps 6-7, we handle the user information Google gives us to create a new record in our database and create a cookie for this user.

6. **Create record in MongoDB database using user information returned by Google.**
7. **Set userid in cookie for this user and redirect them back to homepage.** The user is logged in and authenticated now.

After the user is logged in, we can handle API calls from valid users.

8. User sends request to API. Cookie is automatically included.
9. **We handle the requests and return responses based on request and whether the user is authorized.**