import axios from 'axios'

const baseUrl = 'http://localhost:3000'

export const get = async (route: string) => {
	const promise = await axios.get(baseUrl + route)
	const status = promise.status
	if (status === 200) {
		const data = promise.data
		return data
	} else {
		console.info('Not OK', status)
		return status
	}
}

export const post = async (route: string) => {
	const promise = await axios.post(baseUrl + route)
	const status = promise.status
	if (status === 200) {
		const data = promise.data
		return data
	} else {
		console.info('Not OK', status)
		return status
	}
}
