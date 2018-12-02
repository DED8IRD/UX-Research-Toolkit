// SurveyField.js
import React from 'react'
import {Form} from 'semantic-ui-react'

const SurveyField = ({type, name, options}) => {
	switch (type) {
		case 'text':
		  return (
		    <Form.Input 
		    	fluid 
		    	label={name}
		    	placeholder={name}
		    />
		  )
		case 'textarea':
		  return (
		    <Form.TextArea 
		    	fluid 
		    	label={name}
		    />
		  )
		case 'select':
			options = options.map((option) => ({key: option, value: option, text:option}))
		  return (
		    <Form.Select 
		    	fluid 
		    	label={name}
		    	placeholder={name}
		    	options={options}
		    />
		  )
		case 'checkbox':
		  return (
		  	<Form.Group>
		  		<label>{name}</label>
		  		{options.map((option) => (
				    <Form.Checkbox 
				    	fluid 
				    	label={option}
				    />
		  		))}
		  	</Form.Group>
		  )

	} 
}

export default SurveyField;