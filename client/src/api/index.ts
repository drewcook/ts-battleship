import axios from 'axios'

const production = 'https://battleship.drewcook.dev'
const development = 'http://localhost:3000'
const baseUrl: string = process.env.NODE_ENV === 'production' ? production : development
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
