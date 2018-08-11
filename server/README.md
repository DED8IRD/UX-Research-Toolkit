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

