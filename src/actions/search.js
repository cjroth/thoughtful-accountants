import { push } from 'react-router-redux'

import querystring from '../querystring'

export const getSearchQueryStringFromState = ({ search }) => {
	const params = {}
	if (search.query) {
		params.query = search.query
	}
	if (search.selected) {
		params.tags = search.selected
	}
	if (search.location) {
		if (search.location.country) {
			params.country = search.location.country
		}
		if (search.location.state) {
			params.state = search.location.state
		}
		if (search.location.city) {
			params.city = search.location.city
		}
	}
	return querystring(params)
}

// Do the actual search
export const search = () => {
	return async (dispatch, getState) => {
		const search = getSearchQueryStringFromState(getState())
		dispatch({
			type: 'SEARCH',
		})
		const response = await fetch(`${process.env.API_URL}/accountants/search?${search}`)
		const results = await response.json()
		dispatch({
			type: 'SEARCH_SUCCEEDED',
			results,
		})
	}
}

// Update the URL params based on the state.search
// This will cause React Router to then trigger the actual search
export const updateURLParams = () => {
	return async (dispatch, getState) => {
		const search = getSearchQueryStringFromState(getState())
		dispatch(push(`?${search}`))
	}
}

// Toggle a search tag in state.search
// Then trigger performSearch() to update the URL
export const toggleSearchTag = (tag) => {
	return async (dispatch, getState) => {
		dispatch({
			type: 'SEARCH_TAG_TOGGLED',
			tag,
		})
		await dispatch(updateURLParams())
	}
}

// Update the search params in state.search
// Then trigger performSearch() to update the URL
export const updateSearch = (params, shouldUpdateURLParams = true) => {
	return async (dispatch, getState) => {
		dispatch({
			type: 'SEARCH_UPDATED',
			...params
		})
		if (shouldUpdateURLParams) {
			await dispatch(updateURLParams())
		}
	}
}
