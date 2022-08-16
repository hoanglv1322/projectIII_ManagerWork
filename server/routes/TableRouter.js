const express = require('express')
const router = express.Router()
const tableController = require('../controller/TableController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/table/create
@des update user
@access Public
*/
router.post('/create', verifyToken, tableController.createTable)

/* 
@Router POST api/table/update/drop/:id
@des update table drop
@access Public
*/
router.post('/update/drop/:id', verifyToken, tableController.updateDropColumn)

/* 
@Router POST api/table/update/:id/:isAddMember
@des update table
@access Public
*/
router.post(
	'/update/:id/:isAddMember',
	verifyToken,
	tableController.updateTable
)

/* 
@Router POST api/table/delete/:id
@des get table
@access Public
*/
router.delete('/delete/:id', verifyToken, tableController.deleteTable)

/* 
@Router POST api/table/
@des get all table
@access Public
*/
router.get('/', verifyToken, tableController.getAllTable)

module.exports = router
