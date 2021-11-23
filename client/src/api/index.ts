import axios from 'axios'

const baseUrl = process.env.HOST + ':' + process.env.PORT

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

export const post = async (route: string, data: any = null) => {
	const promise = await axios.post(baseUrl + route, data)
	const status = promise.status
	if (status === 200) {
		const data = promise.data
		return data
	} else {
		console.info('Not OK', status)
		return status
	}
}
