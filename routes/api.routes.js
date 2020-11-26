const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')

// Endpoints
router.get('/farms', (req, res, next) => {

    Farm
        .find()
        .then(farms => res.json(farms))
        .catch(err => next(new Error(err)))})

module.exports = router