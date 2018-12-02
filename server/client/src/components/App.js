import React from 'react';
import {Responsive, Container} from 'semantic-ui-react'
import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import CreateSurveyForm from './CreateSurveyForm'

const App = () => {
	return (
		<Responsive>
			<Header />
			<Container style={{paddingTop: '7em'}}>
				<Dashboard />
				<Landing />
				<CreateSurveyForm />
			</Container>
		</Responsive>
	);
};

export default App;
