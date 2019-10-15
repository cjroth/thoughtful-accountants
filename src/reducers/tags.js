const initialState = {
	loading: true,
	tags: [],
}

export default (state = initialState, action) => {
	switch(action.type) {
		case 'TAGS_FETCH': {
			return {
				...state,
				loading: true,
			}
		}
		case 'TAGS_FETCH_SUCCEEDED': {
			return {
				...state,
				loading: false,
				tags: action.tags,
			}
		}
		default: {
			return state
		}
	}
}
