const Column = require('../models/Column')
const Card = require('../models/Card')

class CardController {
	createCard = async (req, res) => {
		const { cardName } = req.body
		if (!cardName) {
			return res.status(400).json({
				success: false,
				message: 'Invalid information card',
			})
		}

		const card = new Card(req.body)

		try {
			const saveCard = await card.save()
			await Column.findOneAndUpdate(
				req.params.columnId,
				{ $push: { cards: saveCard._id } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Create card successfully',
				saveCard,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	updateCard = async (req, res) => {
		try {
			const cardUpdated = await Card.findByIdAndUpdate(
				req.params.id,
				{
					$set: req.body,
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Update card successfully',
				cardUpdated,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	getCard = async (req, res) => {
		try {
			const card = await Card.findById(req.params.id)
			res.status(200).json({
				success: true,
				card,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'Interval server',
			})
		}
	}

	deleteCard = async (req, res) => {
		try {
			const cardID = req.params.id
			const card = await Card.findByIdAndDelete(cardID)
			await Column.findOneAndUpdate(
				req.params.tableId,
				{ $pull: { cards: cardID } },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'Delete table successfully',
				card,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new CardController()
