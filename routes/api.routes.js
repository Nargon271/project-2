const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')

// Endpoints
router.get('/farms', (req, res, next) => {

    Farm
        .find({ role: 'FARMER' })
        .then(farms => res.json(farms))
        .catch(err => next(err))
})

module.exports = router