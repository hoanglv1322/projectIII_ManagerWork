require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/ConnectDb')
const router = require('./routes/index')

//connect db
connectDB()

app.use(express.json())

//use mideware to format body in post
app.use(
	express.urlencoded({
		extended: true,
	})
)

//run server router
router(app)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))
