import '@babel/polyfill'
import React, { Component } from 'react'
import { render } from 'react-dom'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { Provider } from 'react-redux'
import { Route, Redirect, Switch } from 'react-router-dom'
import thunk from 'redux-thunk'

import '../semantic/semantic.less'
import './style.less'

import search from './reducers/search'
import tags from './reducers/tags'
import results from './reducers/results'

import { updateSearch } from './actions/search'
import App from './App'

const history = createHistory()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
	combineReducers({
		search,
		tags,
		results,
		router: routerReducer,
	}),
	undefined,
	composeEnhancers(
		applyMiddleware(thunk),
		applyMiddleware(
			routerMiddleware(history),
		),
	)
)

fetch(`${process.env.API_URL}/tags/`)
	.then(response => response.json())
	.then(response => {
		store.dispatch({
			type: 'TAGS_FETCH_SUCCEEDED',
			tags: response,
		})
	})

const params = new URLSearchParams(history.location.search)
const selected = params.getAll('tags')
const query = params.get('query')
const country = params.get('country')
const state = params.get('state')
const city = params.get('city')
const location = { country, state, city }
store.dispatch(updateSearch({ selected, query, location }))

render((
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Route exact path='/' component={App} />
		</ConnectedRouter>
	</Provider>
), document.getElementById('app'))
