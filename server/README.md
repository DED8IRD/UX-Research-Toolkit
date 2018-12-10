# React Components
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
- `<Dashboard>`
- `<SurveyList>`
- `<Survey>`
- `<Report>`  
- `<CreateSurveyForm>`
- `<SurveyField>`

#### Container components
- `<SurveyListContainer>`
- `<CreateSurvey>`

## UI Framework
Though never necessary, using a CSS framework can make frontend development much easier. Instead of using a CSS framework like Bootstrap, or Materialize, I suggest using a **UI framework** for your React applications. A UI framework basically has prebuilt styled components for you to use in your React apps. 

There are many UI frameworks out there, such as Material UI, Ant Design, Blueprint, and Semantic UI. Feel free to choose whatever you feel fits best. For this example, I will be using [React Semantic UI](https://react.semantic-ui.com/).

### React Semantic UI
#### Install
```
> yarn add semantic-ui-react semantic-ui-css
```

#### Usage 
After install, you'll need to include the minified CSS file in your index.js file:
```jsx
import 'semantic-ui-css/semantic.min.css';
```

  Refer to [React Semantic UI's documentation](https://react.semantic-ui.com/) on how to use its components. 
___
In this section, we will set up the presentational components. In the next section we will hook up Redux and our container components.