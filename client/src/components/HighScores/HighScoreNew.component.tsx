import React, { useState } from 'react'
import { post } from '../../api'

interface HighScoreNewProps {
	moves: number
	onSubmit: () => void
}

const HighScoreNew = (props: HighScoreNewProps) => {
	const { moves, onSubmit } = props
	const [name, setName] = useState('')

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)

	const handleSubmit = async (e: React.FormEvent) => {
		try {
			e.preventDefault()
			await post('/highscores/new', { name, moves })
			// Handle parent callback
			onSubmit()
		} catch (ex: any) {
			console.error('Exception occurred playGame()', ex)
		}
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor="#name">Nickname</label>
				<input type="text" id="name" placeholder='Please enter your nickname' onChange={handleChange} value={name} />
				<button type="submit">Add new</button>
			</form>
		</div>
	)
}

export default HighScoreNew
