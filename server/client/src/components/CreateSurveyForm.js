// CreateSurveyForm.js
import React from 'react'
import {
  Segment,
  Form,
  Button,
} from 'semantic-ui-react'
import CreateSurveyField from './CreateSurveyField'
import SurveyField from './SurveyField'

export default class CreateSurveyForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      description: props.description,
      surveyFields: props.surveyFields,
      newField: undefined,
      fieldType: undefined,
      fieldLabel: undefined
    }

    this.setLabel = this.setLabel.bind(this)
    this.saveField = this.saveField.bind(this)
    this.deleteField = this.deleteField.bind(this)
    this.handleSaveSurvey = this.handleSaveSurvey.bind(this)
    this.handleFieldTypeSelect = this.handleFieldTypeSelect.bind(this)
  }
  
  handleFieldTypeSelect(evt, {value}) {
    this.setState(() => ({
      fieldType: value,
      newField: <CreateSurveyField 
                  fieldType={value} 
                  setLabel={this.setLabel}
                  saveField={this.saveField}
                />
    }))
  }

  setLabel(label) {
    this.setState(() => ({
      fieldLabel: label
    }))
  }

  saveField(options=null) {
    const field = {
      type: this.state.fieldType,
      label: this.state.fieldLabel,
      options
    }

    this.setState((prevState) => ({
      surveyFields: [...prevState.surveyFields, field],
      fieldLabel: undefined,
      newField: undefined
    }))
  }

  deleteField(field) {
    this.setState((prevState) => ({
      surveyFields: prevState.surveyFields.filter((item) => item !== field)
    }))
  }

  handleSaveSurvey(evt) {
    evt.preventDefault()
  }

  render() {
    const [text, textarea, select, checkbox] = ['text', 'textarea', 'select', 'checkbox']

    return (
      <Form>
        <SurveyField type='text' name='Survey Title' />
        <SurveyField type='textarea' name='Survey Description' />   
        <Form.Group inline>
          <label>Field Type</label>
          <Form.Radio
            label={text}
            value={text}
            checked={this.state.fieldType === text}
            onClick={this.handleFieldTypeSelect}
          />
          <Form.Radio
            label={textarea}
            value={textarea}
            checked={this.state.fieldType === textarea}
            onClick={this.handleFieldTypeSelect}
          />
          <Form.Radio
            label={select}
            value={select}
            checked={this.state.fieldType === select}
            onClick={this.handleFieldTypeSelect}
          />
          <Form.Radio
            label={checkbox}
            value={checkbox}
            checked={this.state.fieldType === checkbox}
            onClick={this.handleFieldTypeSelect}
          />

        </Form.Group>
        {this.state.newField}

        {this.state.surveyFields.map((field) => (
          <Segment key={field.label}>
            <SurveyField 
              type={field.type}
              name={field.label}
              options={field.options}
            />
            <Button
              icon='delete'
              onClick={() => this.deleteField(field)}
            /> 
          </Segment>
        ))}

        <Button
          primary
          icon='save'
          content='Save form'
        />
      </Form>
    )
  }
}

CreateSurveyForm.defaultProps = {
  title: '',
  description: '',
  surveyFields: [],
}  
