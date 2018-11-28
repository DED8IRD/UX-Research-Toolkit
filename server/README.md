# React with Redux
## Frontend Architecture 
Our React client app will be primary composed of two layers, each contained in a single file:
1. Data layer: `client/src/index.js`
	- Data logic (Redux)
2. Rendering layer: `client/src/App.js`
	- Component logic (React Router)

### Component architecture
UXTK will contain the following components:
- `<Header>`: navbar 
- `<Landing>`: landing page
- `<Dashboard>`: dashboard of user surveys 
	- `<SurveyList>`: survey list
		- `<Survey>`: individual survey 
			- `<Report>`: report of survey responses
- `<CreateSurveyForm>`: create/customize survey form 
	- `<SurveyField>`: individual form fields

## Set Up React App
Create-React-App comes prepackaged with a lot of boilerplate code. We're going to get rid of that and start from scratch.

Remove everything from `client/src/` *except* `serviceWorker.js` and `setupProxy.js` (if you have it).

Create a new directory named `components`. Create a new file within `components/` called `App.js`and add the following within:
```jsx 
import React from 'react';

const App = () => {
	return (
		<React.Fragment>
			Hello World!
		</React.Fragment>
	);
};

export default App;
```

Create a new file named `index.js` and add the following lines:
```jsx 
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

ReactDOM.render(
	<App />, 
	document.querySelector('#root')
);

```

`client/` should look like this now:
```
client/
├── README.md
├── node_modules/
├── package.json/
├── .gitignore
├── public/
│   ├── favicon.ico
│   ├── index.html
│   └── manifest.json
└── src/
    ├── components/ 
	│	└── App.js
    ├── index.js
    ├── serviceWorker.js
    └── setupProxy.js
```

Run your dev servers `yarn dev` and you should see `Hello World!` onscreen.

### Install Redux, React-Router 
**Important:** Make sure you are inside the `client/` directory when adding the following modules:

```
> yarn add redux, react-redux, react-router-dom
// OR 
> npm install redux, react-redux, react-router-dom
```

# React-Redux
## Frontend Architecture 
Our React client app will be primary composed of two layers, each contained in a single file:
1. Data layer: `client/src/index.js`
  - Data logic (Redux)
2. Rendering layer: `client/src/App.js`
  - Component logic (React Router)

### Component architecture
UXTK will contain the following components:
- `<Header>`: navbar 
- `<Landing>`: landing page
- `<Dashboard>`: dashboard of user surveys 
  - `<SurveyList>`: survey list
    - `<Survey>`: individual survey 
      - `<Report>`: report of survey responses
- `<CreateSurveyForm>`: create/customize survey form 
  - `<SurveyField>`: individual form fields

#### Presentational components
- `<Header>`
- `<Landing>` 
- `<Survey>`
- `<Report>`  
- `<SurveyField>`

#### Container components
- `<Dashboard>`
- `<SurveyList>`
- `<CreateSurveyForm>`

#### Actions 
- 