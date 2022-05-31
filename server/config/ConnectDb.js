const mongoose = require('mongoose')

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGGO)
		console.log('Conected to mongodb!')
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}

module.exports = connectDB
