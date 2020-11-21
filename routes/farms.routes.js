const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.render('farms/farms-list'))


module.exports = router