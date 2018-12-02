// Dashboard.js
import React from 'react';
import {Container} from 'semantic-ui-react'
import SurveyList from './SurveyList'

export default class Dashboard extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Container style={{ marginTop: '7em' }}>
				<SurveyList />
			</Container>
		);
	}
}