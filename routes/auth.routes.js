const express = require('express')
const router = express.Router()

// Endpoints
router.get('/log-in', (req, res) => res.render('auth/login-form'))
router.get('/sign-up', (req, res) => res.render('auth/signup-form'))

module.exports = router