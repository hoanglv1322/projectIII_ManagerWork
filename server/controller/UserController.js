const User = require('../models/User')

class UserController {
	//update user
	updateUser = async (req, res) => {
		try {
			const userUpdate = await User.findByIdAndUpdate(
				req.userId,
				{ $set: req.body },
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'User updated successfully',
				user: userUpdate,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//get user
	getUser = async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userId }).populate(
				'tables'
			)
			res.status(200).json({
				success: true,
				message: 'Get ser successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//get all user
	getAllUsers = async (req, res) => {
		try {
			const allUsers = await User.find()
			res.status(200).json({
				success: true,
				message: 'Get user successfully',
				allUsers,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	//delete user
	deleteUser = async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.userId })
			if (!user.isAdmin) {
				res.status(400).json({
					success: false,
					message: 'you are not allowed',
				})
			}
			const userDelete = await User.findByIdAndDelete(req.params.id)
			res.status(200).json({
				success: true,
				message: 'Delete user successfully',
				userDelete,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}

	updatedTable = async (req, res) => {
		const isFavourite = req.params.isFavourite
		const isRecently = req.params.isRecently
		try {
			let user
			if (isRecently === 'true') {
				user = await User.findByIdAndUpdate(
					req.userId,
					{
						$addToSet: { recentlyTable: req.params.tableId },
					},
					{ new: true }
				)
			} else {
				user = await User.findByIdAndUpdate(
					req.userId,
					{
						$pull: { recentlyTable: req.params.tableId },
					},
					{ new: true }
				)
			}
			if (isFavourite === 'true') {
				user = await User.findByIdAndUpdate(
					req.userId,
					{
						$addToSet: { favoriteTable: req.params.tableId },
					},
					{ new: true }
				)
			} else {
				user = await User.findByIdAndUpdate(
					req.userId,
					{
						$pull: { favoriteTable: req.params.tableId },
					},
					{ new: true }
				)
			}
			res.status(200).json({
				success: true,
				message: 'update table of user successfully',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server!',
			})
		}
	}
}

module.exports = new UserController()
