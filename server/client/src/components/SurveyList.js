// SurveyList.js
import React from 'react'
import {
	Segment,
	Card
} from 'semantic-ui-react'
import Survey from './Survey'

export default class SurveyList extends React.Component {

	constructor(props) {
		super(props)
	}

	render() {
		const surveys = [{id: 1, title: 'usability survey', description: 'ux survey', responseCount: 0, report:1}]
		return (
			<div>
				{surveys.map((survey) => {
					return (
						<Card key={survey.id}> 
							<Card.Content header={survey.title} />
							<Card.Content content={survey.description} />
							<Card.Content content={'Responses: ' + survey.responseCount} />
							<Card.Content content={'Report ' + survey.report} />
						</Card>
					)
				})}
			</div>
		)
	}
}
