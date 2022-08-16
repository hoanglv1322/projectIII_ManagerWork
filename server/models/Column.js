const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ColumnSchema = mongoose.Schema({
	columnName: {
		type: String,
		required: true,
	},
	tableId: {
		type: Schema.Types.ObjectId,
		ref: 'tables',
	},
	description: {
		type: String,
	},
	cards: [
		{
			type: Schema.Types.ObjectId,
			ref: 'cards',
		},
	],
})

module.exports = mongoose.model('columns', ColumnSchema)
