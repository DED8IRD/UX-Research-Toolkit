<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [React Frontend](#react-frontend)
  - [Create React App](#create-react-app)
    - [Create Project](#create-project)
    - [Run app in development mode](#run-app-in-development-mode)
    - [Testing](#testing)
    - [Building](#building)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# React Frontend
We've completed setting up Google OAuth and created a basic backend Express app. Now we're ready to move onto the frontend with React.

We're going to use [Create-React-App](https://github.com/facebook/create-react-app) (CRA) to, well, create a React app. 

## Create React App 
Create-React-App lets you create React apps with no build configuration. You don’t need to install or configure tools like Webpack or Babel (CRA handles that for you with hidden configurations so that you can just get to writing code). CRA sets up a boilerplate React app, so you can start developing immediately.

### Create Project
We're going to create a CRA app called `client` inside our `server/` directory.

```
> yarn create react-app client
// OR 
> npm init react-app client
``` 

This will create a directory called `client/` inside the current directory. Inside `client/`, CRA will generate the initial project structure and install the transitive dependencies:

```
client/
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src
    ├── App.css
    ├── App.js
    ├── App.test.js
    ├── index.css
    ├── index.js
    ├── logo.svg
    └── serviceWorker.js
```

### Run app in development mode 
To run your client dev server, enter your React app directory:
```
> cd client
```

Run the `start` command:
```
> yarn start 
// OR 
> npm start
```

You React app should be live at [ http://localhost:3000]. 

The built-in dev server has live reloading, so any changes you make will automatically reload onto the page. Build errors and lint warnings will appear in the console.

### Testing 
To run the test watcher in an interactive mode:
```
> yarn test 
// OR 
> npm test
```

### Building 
To build the app for production mode in the `build/` directory:
```
> yarn build
// OR
> npm run build
```

This optimizes (minimizes and bundles your static assets) your build for performance.

Your app is ready to deploy at this point. 

## Two Servers? 
We're going to be developing with a separate server for our client and server-side code. The reason for this is that CRA comes bundled with a server already, and to keep things simple, we'll do a little bit of work to have the two servers play nicely.

The React server will bundle our client files (i.e. React components and other JavaScript code) together and serve those files.

The Express server will handle database calls and serve our content as JSON.

### `Concurrently` to run the React and Express servers simultaneously
You can run the client server and server-side server simultaneously in different windows (but that's not very elegant).

A nicer way of having the client and server play nicely is to use a package called [Concurrently](https://www.npmjs.com/package/concurrently).

#### Install
```
> yarn add concurrently 
// OR 
> npm install concurrently
```

#### Add scripts to `server/package.json`
An important note to remember: we now have *two `package.json` files* (one in `server/` and one in `client/`). I'll make sure to make the distinction when modifying each.

After we install `concurrently`, replace `scripts` with the following in `server/package.json`:

```js 
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "yarn --cwd client start",
    "dev": "concurrently \"yarn server\" \"yarn client\""
  },
```

Or if you're using `npm`:
```js 
  "scripts": {
    "start": "node index.js",
    "server": "nodemon index.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm server\" \"npm client\""
  },
```

Above, we changed the name of the old `dev` command to `server`, added the `client` command, and created a new `dev` command that uses `concurrently` to run both the client and backend servers concurrently.

Now, simply run `yarn start` or `npm start` inside `server/` and both the React and Express servers should run simultaneously.