# Getting our project deployment ready

We're going to deploy UXTK on [Heroku]()

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