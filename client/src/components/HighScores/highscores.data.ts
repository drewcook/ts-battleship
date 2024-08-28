import { post } from '../../api'

const generateRandomDate = (): Date =>
	new Date(+new Date() - Math.floor(Math.random() * 10000000000))

export interface IHighScore {
	_id: number
	name: string
	moves: number
	created_at: Date
}

const mockData = [
	{
		id: 1,
		name: 'Rockin Rob',
		moves: 43,
		dateCreated: generateRandomDate(),
	},
	{
		id: 2,
		name: 'Happy Day',
		moves: 19,
		dateCreated: generateRandomDate(),
	},
	{
		id: 3,
		name: 'DMC',
		moves: 29,
		dateCreated: generateRandomDate(),
	},
	{
		id: 4,
		name: 'John',
		moves: 78,
		dateCreated: generateRandomDate(),
	},
	{
		id: 5,
		name: 'Roberto',
		moves: 36,
		dateCreated: generateRandomDate(),
	},
	{
		id: 6,
		name: 'The Master',
		moves: 58,
		dateCreated: generateRandomDate(),
	},
	{
		id: 7,
		name: 'Dennis',
		moves: 48,
		dateCreated: generateRandomDate(),
	},
	{
		id: 8,
		name: 'Sarah',
		moves: 24,
		dateCreated: generateRandomDate(),
	},
	{
		id: 9,
		name: 'MMM',
		moves: 32,
		dateCreated: generateRandomDate(),
	},
	{
		id: 0,
		name: 'You Betcha',
		moves: 27,
		dateCreated: generateRandomDate(),
	},
]

export const postMockData = async () => {
	for (let highscore of mockData) {
		await post('/highscores/new', {
			name: highscore.name,
			moves: highscore.moves,
			created_at: highscore.dateCreated,
		})
	}
}

export default mockData
