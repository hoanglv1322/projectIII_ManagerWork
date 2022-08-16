const authRouter = require('./AuthRouter')
const userRouter = require('./UserRouter')
const tableRouter = require('./TableRouter')
const columnRouter = require('./ColumnRouter')
const cardRouter = require('./CardRouter')
const commentRouter = require('./CommentRouter')

function router(app) {
	app.use('/api/auth', authRouter)
	app.use('/api/user', userRouter)
	app.use('/api/table', tableRouter)
	app.use('/api/column', columnRouter)
	app.use('/api/card', cardRouter)
	app.use('/api/comment', commentRouter)
}

module.exports = router
