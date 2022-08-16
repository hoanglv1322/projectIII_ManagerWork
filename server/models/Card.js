const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = mongoose.Schema({
	cardName: {
		type: String,
		required: true,
	},
	description: { type: String },
	columnId: {
		type: Schema.Types.ObjectId,
		ref: 'columns',
	},
	lables: [
		{
			type: String,
		},
	],
	members: [
		{
			type: String,
		},
	],
	deadline: {
		type: { type: String },
	},
	image: { type: String },
})

module.exports = mongoose.model('cards', CardSchema)
