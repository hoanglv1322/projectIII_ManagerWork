const express = require('express')
const router = express.Router()
const authController = require('../controller/AuthController')
const validatorRegister = require('../util/validator')
const verifyToken = require('../util/verifyToken')

/* 
@Router POST api/auth/
@des register users
@access Public
*/
router.get('/', verifyToken, authController.checkAuth)

/* 
@Router POST api/auth/register 
@des register users
@access Public
*/
router.post('/register', validatorRegister, authController.register)

/* 
@Router POST api/auth/login
@des register users
@access Public
*/
router.post('/login', authController.login)

/* 
@Router POST api/auth/verifyuser
@des verify users
@access Public
*/
router.post('/verifyuser', verifyToken, authController.verifyUser)

module.exports = router
