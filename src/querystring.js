export default (search) => {
	const params = new URLSearchParams()
	for (let key in search) {
		const value = search[key]
		if (value instanceof Array) {
			for (let element of value) {
				params.append(key, element)
			}
		} else {
			params.append(key, value)
		}
	}
	return params.toString()
}
