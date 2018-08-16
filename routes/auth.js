const express = require('express')

const controller = require('../controllers/auth')

const router = express.Router()

//localhost:5000/api/auth/login
router.get('/login', controller.login)
//localhost:5000/api/auth/register
router.get('/register', controller.register)

module.exports = router