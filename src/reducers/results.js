const initialState = {
	loading: false,
	results: [],
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'SEARCH': {
			return {
				...state,
				loading: true,
			}
		}
		case 'SEARCH_SUCCEEDED': {
			return {
				...state,
				loading: false,
				results: action.results,
			}
		}
		default: {
			return state
		}
	}
}
