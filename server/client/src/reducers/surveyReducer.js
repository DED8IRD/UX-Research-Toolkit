// surveyReducer.js
import {
	ADD_SURVEY,
	addSurvey
} from '../actions/surveyActions'

const surveyReducer = (state={}, action) => {
	switch (action.type) {
		case ADD_SURVEY:
			const survey = {[action.survey.id]: action.survey}
			return {...state, ...survey}
		default:
			return state
	}
}

export default surveyReducer