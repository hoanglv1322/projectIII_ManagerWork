const Table = require('../models/Table')
const User = require('../models/User')
const sendMail = require('../config/SendEmail')

const CLIENT_URL = `${process.env.BASE_URL}`

const txtAdd = {
	title: 'you are added to table',
	des: 'you are added to table, you can read and write work in table',
	button: 'Visit table',
}

const txtRemove = {
	title: 'you are logouted to table',
	des: 'you are logouted to table, you can not read and write work in table',
	button: 'Visit home',
}

class TableController {
	createTable = async (req, res) => {
		const { tableName } = req.body
		if (!tableName) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information table',
			})
		}

		const table = new Table(req.body)
		table.admin = req.userId

		try {
			const saveTable = await table.save()
			await User.findOneAndUpdate(
				req.userId,
				{ $push: { tables: saveTable._id } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Create table successfully',
				saveTable,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateTable = async (req, res) => {
		const isAddMember = req.params.isAddMember
		try {
			let tableUpdated
			const memberAdd = await User.findById(req.body.member)
			if (isAddMember === 'true') {
				tableUpdated = await Table.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
						$addToSet: { members: req.body.member },
					},
					{ new: true }
				)
				if (memberAdd) {
					const url = `${CLIENT_URL}`
					sendMail(memberAdd.email, url, txtAdd)
				}
			} else {
				tableUpdated = await Table.findByIdAndUpdate(
					req.params.id,
					{
						$set: req.body,
						$pull: { members: req.body.member },
					},
					{ new: true }
				)
				if (memberAdd) {
					const url = `${CLIENT_URL}`
					sendMail(memberAdd.email, url, txtRemove)
				}
			}
			res.status(200).json({
				success: true,
				message: 'Update table successfully',
				tableUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	getTable = async (req, res) => {
		try {
			const table = await Table.findById(req.params.id).populate(
				'members'
			)
			res.status(200).json({
				success: true,
				table,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteTable = async (req, res) => {
		try {
			const table = await Table.findByIdAndDelete(req.params.id)
			await User.findOneAndUpdate(
				req.userId,
				{ $pull: { tables: saveTable._id } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Delete table successfully',
				table,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new TableController()
