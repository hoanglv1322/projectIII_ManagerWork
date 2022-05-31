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
@Router POST api/table/:id
@des get table
@access Public
*/
router.get('/:id', verifyToken, tableController.getTable)

/* 
@Router POST api/table/delete/:id
@des get table
@access Public
*/
router.delete('/:id', verifyToken, tableController.deleteTable)

module.exports = router
