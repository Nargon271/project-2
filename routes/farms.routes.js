const express = require('express')
const router = express.Router()
const Farm = require('../models/farm.model')
const User = require('../models/user.model')

const escapeRegExp = require('./../utils/text.utils')

// Middleware

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })

// Endpointsnpm

// Farms List
router.get('/', (req, res, next) => {

    const query = req.query.search ? { farmname: new RegExp(escapeRegExp(req.query.search), 'gi') } : {}

    Farm
        .find(query, { farmname: 1, farmImg: 1, user: 1 })
        .populate('user')
        .then(allFarms => res.render('farms/farms-list', { allFarms }))
        .catch(err => next(new Error(err)))
})


router.post('/', ensureAuthenticated, (req, res, next) => {

    const theUser = req.user
    const list = theUser.favorites
    let newlist = [...list, req.query.id]
    
    User
        .findByIdAndUpdate(req.user.id, { favorites: newlist })
        .then(() => res.redirect('/farms'))
        .catch(err => next(new Error(err)))
})

// Farm details
router.get('/:farm_id', (req, res, next) => {

    const farmId = req.params.farm_id

    Farm
        .findById(farmId)
        .populate('user')
        .then(theFarm => { res.render('farms/farm-details', theFarm) })
        .catch(err => next(new Error(err)))
})

module.exports = router