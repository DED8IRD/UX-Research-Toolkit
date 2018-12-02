// Survey.js
import React from 'react'
import {
	Header,
	Form,
	Item
} from 'semantic-ui-react'
import SurveyField from './SurveyField'

const Survey = ({title, description, surveyFields}) => {
  return (
	    <Form>
	    	<Header size='huge'>{title}</Header>
	    	<Header size='medium'>{description}</Header>

	    	{surveyFields.map((field, idx) => (
	    		<SurveyField key={idx}
	    			type={field.type}
	    			name={field.label}
	    			options={field.options}
	    		/>
	    	))}
	    </Form>
  )
}

export default Survey