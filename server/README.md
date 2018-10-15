<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Set up production environment](#set-up-production-environment)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Set up production environment 
Since we wrapped up the OAuth segment, now's a great time to deploy! 

```
git push heroku 
```

When you try to access your site, you should get this error: `Error: Cannot find module './config/keys'`. This is because we've configured our `.gitignore` to ignore our secret dev keys, *as we should*. 

We should instead set up our **production environment** with its own database, Google app, and secret keys. 

Note that these are the same steps we've done earlier for our dev environment.

## Create new MongoDB deployment 
- Log in to [mlab.com] and create a new MongoDB deployment. 
- Select **Sandbox** for the free plan (like we've done earlier). 
- Create a new user.

## Create new Google app
- Go to [console.developers.google.com] and create a new project.
- Enable Google+ API.
- Generate new OAuth credentials.
	- Set the `authorized JavaScript origins` and `authorized redirect origins` to your Heroku endpoints.

## Configure `keys.js` for dev and prod environments