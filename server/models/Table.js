const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TableSchema = mongoose.Schema({
	tableName: {
		type: String,
		required: true,
	},
	scope: {
		type: String,
		default: 'private',
	},

	description: {
		type: String,
	},

	background: {
		type: String,
	},

	columns: [
		{
			type: Schema.Types.ObjectId,
			ref: 'columns',
		},
	],

	admin: {
		type: Schema.Types.ObjectId,
		ref: 'users',
	},

	members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'users',
		},
	],
})

module.exports = mongoose.model('tables', TableSchema)
