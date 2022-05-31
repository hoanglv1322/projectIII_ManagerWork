const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CardSchema = mongoose.Schema({
	cardName: {
		type: String,
		required: true,
	},

	lable: [
		{
			type: String,
		},
	],

	member: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},

	deadline: {
		type: Date,
	},

	images: [{ type: String }],
})

module.exports = mongoose.model('cards', CardSchema)
