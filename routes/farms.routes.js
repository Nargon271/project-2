const express = require('express')
const router = express.Router()
const Farm = require('../models/farm.model')
// Endpoints

// Farms List
router.get('/', (req, res, next) => {

    Farm
        .find({ role: 'FARMER' })
        .then(allFarms => res.render('farms/farms-list', { allFarms }))
        .catch(err => next(new Error(err)))
})


// Farm details
router.get('/:farm_id', (req, res) => {

    const farmId = req.params.farm_id

    Farm
        .findById(farmId)
        .then(theFarm => { res.render('farms/farm-details', theFarm) })
        .catch(err => next(new Error(err)))

})



module.exports = router