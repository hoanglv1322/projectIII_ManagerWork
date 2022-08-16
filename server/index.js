require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/ConnectDb')
const router = require('./routes/index')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

//connect db
connectDB()

app.use('/images', express.static(path.join(__dirname, '/images')))
app.use(express.json())
app.use(cors())

//use mideware to format body in post
app.use(
	express.urlencoded({
		extended: true,
	})
)

//upload files
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images')
	},
	filename: (req, file, cb) => {
		cb(null, req.body.name)
	},
})

const upload = multer({ storage: storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
	res.status(200).json('File has been uploaded')
})

//run server router
router(app)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server is running on port ${PORT}!`))
