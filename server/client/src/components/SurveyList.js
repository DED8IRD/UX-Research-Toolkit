// SurveyList.js
import React from 'react'
import {
	Card
} from 'semantic-ui-react'
// import Survey from './Survey'

export default class SurveyList extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const surveys = [
			{
				id: 1, 
				title: 'usability survey', 
				description: 'ux survey', 
				responseCount: 0, 
				report:1, 
				fields: [
					{type:'text', label: 'name'},
					{type:'textarea', label: 'description'},
					{type:'select', label: 'gender', options: ['male', 'female', 'other']},
					{type:'checkbox', label: 'occupation', options: ['education', 'tech', 'social sector', 'labor']},
				]
			},
			{
				id: 2, 
				title: 'user base survey', 
				description: 'demographic survey', 
				responseCount: 0, 
				report:1, 
				fields: [
					{type:'text', label: 'name'},
					{type:'textarea', label: 'description'},
					{type:'select', label: 'gender', options: ['male', 'female', 'other']},
					{type:'checkbox', label: 'occupation', options: ['education', 'tech', 'social sector', 'labor']},
				]
			},			
		]
		return (
			<Card.Group>
				{surveys.map((survey) => (
						<Card key={survey.id}> 
							<Card.Content header={survey.title} />
							<Card.Content content={survey.description} />
							<Card.Content content={'Responses: ' + survey.responseCount} />
							<Card.Content content={'Report ' + survey.report} />
						</Card>
				))}
			</Card.Group>
		)
	}
}
