// SurveyField.js
import React from 'react'
import {Form} from 'semantic-ui-react'

const SurveyField = ({type, name, options}) => {
	switch (type) {
		case 'text':
		  return (
		    <Form.Input 
		    	label={name}
		    	placeholder={name}
		    />
		  )
		case 'textarea':
		  return (
		    <Form.TextArea 
		    	label={name}
		    />
		  )
		case 'select':
			options = options.map((option) => ({key: option, value: option, text:option}))
		  return (
		    <Form.Select 
		    	label={name}
		    	placeholder={name}
		    	options={options}
		    />
		  )
		case 'checkbox':
		  return (
		  	<Form.Group>
		  		<label>{name}</label>
		  		{options.map((option, idx) => (
				    <Form.Checkbox key={idx}
				    	label={option}
				    />
		  		))}
		  	</Form.Group>
		  )

	} 
}

export default SurveyField;