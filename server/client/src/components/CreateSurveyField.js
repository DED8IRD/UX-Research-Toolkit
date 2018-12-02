// CreateSurveyField.js
import React from 'react'
import {
	Form,
	Button
} from 'semantic-ui-react'

export default class CreateSurveyField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			options: [],
			option: undefined
		}

    this.addOption = this.addOption.bind(this)
		this.handleOptionChange = this.handleOptionChange.bind(this)
		this.handleLabelChange = this.handleLabelChange.bind(this)
		this.handleSaveField = this.handleSaveField.bind(this)
	}

	addOption() {
		this.setState((prevState) => ({
			options: [...prevState.options, this.state.option],
      option: undefined
		}))
	}

	handleOptionChange(evt, {value}) {
		this.setState(() => ({
			option: value
		}))
	}

	handleLabelChange(evt, {value}) {
		this.props.setLabel(value)
	}

	handleSaveField(evt) {
    evt.preventDefault()

    if (this.state.option) {
      this.addOption()
    }
		this.props.saveField(this.state.options)
	}

	render() {
		let field
	  if (['select', 'checkbox'].includes(this.props.fieldType)) {
      field = (
      	<React.Fragment>
	        <Form.Input 
	          label='Label'
	          onChange={this.handleLabelChange}
	        />
	      	<Form.Group>
		        {this.state.options.map((option, idx) => (
		        	<Form.Input key={idx}
		        		label='Option'
                value={option}
		        		disabled
              />
            ))}
            <Form.Input 
              label='Option'
              onChange={this.handleOptionChange}
            />                
		        <Button 
		        	content='Add option' 
		        	icon='plus' 
		        	onClick={this.addOption}
		        />
	        </Form.Group>
        </React.Fragment>
      )
    } else {
	  	field = (
	      <Form.Input 
	        fluid 
	        label='Label'
	        onChange={this.handleLabelChange}
	      />
	    )
    }

    return (
    	<React.Fragment>
    		{field}
        <Button
          content='Save field' 
          icon='save' 
          disabled={!this.props.fieldType && !this.props.fieldLabel}
          onClick={this.handleSaveField}            
        />    
      </React.Fragment>
    )
	}
}
