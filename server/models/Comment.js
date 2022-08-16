const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentSchema = mongoose.Schema({
	content: { type: String },
	cardId: {
		type: Schema.Types.ObjectId,
		ref: 'cards',
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},
	dateCreated: {
		type: Date,
	},
	likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],
})

module.exports = mongoose.model('comments', CommentSchema)
