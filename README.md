# Getting our project deployment ready

We're going to deploy UXTK on [Heroku](https://heroku.com/)

To get our code production ready, make the following changes:

In `package.json`:
```
{
  ...
  "engines": {
    "node": "8.11.2",
    "npm": "6.1.0"
  },
  "scripts": {
    "start": "node index.js"
  },	
  ...
}
```

In `index.js`:
```
> yarn add express
// OR 
> npm install express
```

Then, follow instructions on [the deployment checklist](https://github.com/DED8IRD/NodeReactFullStack/blob/master/3%20Node/docs/Deployment%20Checklist.md)