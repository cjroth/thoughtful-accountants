const initialState = {
	query: '',
	location: {},
	selected: [],
}


export default (state = initialState, action) => {

	switch(action.type) {

		case 'SEARCH_QUERY_UPDATED': {
			return {
				...state,
				query: action.query,
			}
		}

		case 'SEARCH_TAG_TOGGLED': {
			const index = state.selected.indexOf(action.tag)
			return {
				...state,
				selected: index > -1 ? [...state.selected.slice(0, index), ...state.selected.slice(index + 1)] : [...state.selected, action.tag]
			}
		}

		case 'SEARCH_UPDATED': {
			const search = { ...state }
			if (action.selected instanceof Array) {
				search.selected = action.selected
			}
			if (typeof action.query === 'string') {
				search.query = action.query
			}
			if (action.location) {
				search.location = action.location
			}
			return search
		}

		default: {
			return state
		}

	}

}
