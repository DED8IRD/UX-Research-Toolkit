import React from 'react';
import {Responsive, Container} from 'semantic-ui-react'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './Header'
import Landing from './Landing'
import Dashboard from './Dashboard'
import CreateSurveyForm from './CreateSurveyForm'

const App = () => {
	return (
		<Responsive>
			<Router>
				<React.Fragment>
					<Header />
					<Container style={{paddingTop: '7em'}}>
						<Route path='/' exact component={Landing} />
						<Route path='/surveys' exact component={Dashboard} />
						<Route path='/surveys/new' exact component={CreateSurveyForm} />
					</Container>
				</React.Fragment>	
			</Router>
		</Responsive>
	)
}

export default App;
