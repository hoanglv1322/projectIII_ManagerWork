const express = require('express')
const router = express.Router()
const userController = require('../controller/UserController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/user/update
@des update user
@access Public
*/
router.post('/update', verifyToken, userController.updateUser)

/* 
@Router GET api/user/
@des get user
@access Public
*/
router.get('/', verifyToken, userController.getUser)

/* 
@Router GET api/user/getall
@des get all user
@access Public
*/
router.get('/getall', verifyToken, userController.getAllUsers)

/* 
@Router DELETE api/user/delete
@des delete users
@access Public
*/
router.delete('/delete/:id', verifyToken, userController.deleteUser)

/* 
@Router DELETE api/user/updateTable
@des delete users
@access Public
*/
router.post(
	'/updateTable/:tableId/:isFavourite/:isRecently',
	verifyToken,
	userController.updatedTable
)

module.exports = router
