const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require('../config/SendEmail')

const CLIENT_URL = `${process.env.BASE_URL_VERIFYUSER}`
const txt = {
	title: 'WELCOME TO WEB MANAGER WORK.',
	des: "Congratulations! You're almost set to start using Manager Work. Just click the button below to validate your email address.",
	button: 'Verify Email',
}

class AuthController {
	//check user
	checkAuth = async (req, res) => {
		try {
			const user = await User.findById(req.userId)
				.select('-password')
				.populate('tables')
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'User not found in database',
				})
			}
			res.status(200).json({ success: true, user })
		} catch (error) {
			console.log(error)
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}

	//verify user
	verifyUser = async (req, res) => {
		try {
			const user = await User.findByIdAndUpdate(
				req.params.userId,
				{
					$set: { status: 'active' },
				},
				{ new: true }
			)
			res.status(200).json({
				success: true,
				message: 'verify account success!!!, login to use app',
				user,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	//register account
	register = async (req, res) => {
		const { username, password, email } = req.body
		try {
			//email exits in database
			const account = await User.findOne({ email })

			if (account) {
				return res.status(400).json({
					success: false,
					message: ['email already exits'],
				})
			}
			//all good
			//hash password
			const salt = await bcrypt.genSalt(10)
			const hashPassword = await bcrypt.hash(password, salt)
			const newUser = await User({
				username,
				email,
				password: hashPassword,
			})
			await newUser.save()

			//return token
			const accessToken = await jwt.sign(
				{ userID: newUser._id },
				process.env.ACCESS_TOKEN_SECRET
			)
			const url = `${CLIENT_URL}`
			sendMail(email, url, txt)
			res.status(200).json({
				success: true,
				message: 'Register account success!!!, please verify email!',
				accessToken,
			})
		} catch (error) {
			res.status(500).json({
				success: false,
				message: 'internal server',
			})
		}
	}

	//login with email and password
	login = async (req, res) => {
		const { email, password } = req.body

		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: 'Invalid email or password',
			})
		}

		try {
			const user = await User.findOne({ email })
			if (!user) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password',
				})
			}

			//user not verify email
			if (user.status === 'block') {
				return res.status(400).json({
					success: false,
					message: 'Email is not verify, please verify email first',
				})
			}

			//user founded
			if (!bcrypt.compare(password, user.password)) {
				return res.status(400).json({
					success: false,
					message: 'Invalid email or password ',
				})
			}

			//return token
			const accessToken = await jwt.sign(
				{ userID: user._id },
				process.env.ACCESS_TOKEN_SECRET
			)

			res.status(200).json({
				success: true,
				accessToken,
				user,
			})
		} catch (err) {
			res.status(500).json({
				success: false,
				message: 'Internal server error',
			})
		}
	}
}

module.exports = new AuthController()
