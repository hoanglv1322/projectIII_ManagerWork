const Column = require('../models/Column')
const Table = require('../models/Table')

class ColumnController {
	createColumn = async (req, res) => {
		const { columnName } = req.body
		if (!columnName) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information column',
			})
		}

		const column = new Column(req.body)

		try {
			const saveColumn = await column.save()
			await Table.findByIdAndUpdate(
				req.params.tableId,
				{ $push: { columns: saveColumn._id } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Create column successfully',
				column: saveColumn,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateColumn = async (req, res) => {
		try {
			const columnUpdated = await Column.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update column successfully',
				column: columnUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	updateDropCard = async (req, res) => {
		try {
			const column = await Column.findByIdAndUpdate(
				req.params.id,
				{
					$set: { cards: req.body.columnInfor.cards },
					upsert: true,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update column successfully',
				column,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server drop drag',
			})
		}
	}

	getAllColumn = async (req, res) => {
		try {
			const columns = await Column.find().populate('cards')
			res.status(200).json({
				success: true,
				columns,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteColumn = async (req, res) => {
		try {
			const columnID = req.params.id
			const column = await Column.findByIdAndDelete(columnID)
			await Table.findOneAndUpdate(
				req.params.tableId,
				{ $pull: { columns: columnID } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Delete table successfully',
				column,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new ColumnController()
