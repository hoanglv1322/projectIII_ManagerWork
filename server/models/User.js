const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
		default: '',
	},

	tables: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tables',
		},
	],

	recentlyTable: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tables',
		},
	],

	favoriteTable: [
		{
			type: Schema.Types.ObjectId,
			ref: 'tables',
		},
	],

	createDate: {
		type: Date,
		default: Date.now(),
	},

	isAdmin: {
		type: Boolean,
		default: false,
	},

	status: {
		type: String,
		default: 'block',
	},
})

module.exports = mongoose.model('users', UserSchema)
