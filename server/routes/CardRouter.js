const express = require('express')
const router = express.Router()
const cardController = require('../controller/CardController')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/card/create/:tableId
@des create card
@access user
*/
router.post('/create/:columnId', verifyToken, cardController.createCard)

/* 
@Router POST api/card/update/:id
@des update card
@access user
*/
router.post('/update/:id', verifyToken, cardController.updateCard)

/* 
@Router POST api/card/:id
@des get card
@access user
*/
router.get('/:id', verifyToken, cardController.getCard)

/* 
@Router POST api/card/delete/:id
@des delete card
@access user
*/
router.delete('/delete/:id', verifyToken, cardController.deleteCard)

module.exports = router
