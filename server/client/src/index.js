import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import 'semantic-ui-css/semantic.min.css'
import App from './components/App'

const store = createStore(
	() => [],
	{}
)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector('#root')
)