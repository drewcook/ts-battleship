const mongoose = require('mongoose')

const highScoreSchema = new mongoose.Schema({
	id: {
		type: String,
	},
	name: {
		type: String,
		required: true,
		trim: true,
		minLength: 3,
		maxLength: 100,
	},
	moves: {
		type: Number,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
})

const HighScore = mongoose.model('HighScore', highScoreSchema)

export default HighScore
