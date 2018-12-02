// surveyActions.js
export const ADD_SURVEY = 'ADD_SURVEY'
export const DELETE_SURVEY = 'DELETE_SURVEY'

export const addSurvey = (user, survey) => ({
		type: ADD_SURVEY,
		user,
		survey
})

export const deleteSurvey = (user, survey) => ({
	type: DELETE_SURVEY,
	user,
	survey
})