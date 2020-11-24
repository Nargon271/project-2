const express = require('express')
const router = express.Router()
const Farm = require('../models/farm.model')
const User = require('../models/user.model')


//Middleware
//const isLogged = (req) => req.isAuthenticated() ? true : null
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })

// Endpointsnpm

// Farms List
router.get('/', (req, res, next) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegExp(req.query.search), 'gi')

        Farm
            .find({ farmname: regex })
            .populate('user')
            .then(allFarms => res.render('farms/farms-list', { allFarms }))
            .catch(err => next(new Error(err)))

    } else {
        Farm
            .find()
            .populate('user')
            .then(allFarms => res.render('farms/farms-list', { allFarms }))
            .catch(err => next(new Error(err)))
    }
})

router.post('/', ensureAuthenticated, (req, res, next) => {

    const theUser = req.user
    console.log(theUser)
    const list = theUser.favorites
    let newlist = [...list, req.query.id]
    User
        .findByIdAndUpdate(req.user.id, { favorites: newlist })
        .then(() => res.redirect('/farms'))
        .catch(err=> console.log(err))

})

// Farm details
router.get('/:farm_id', (req, res) => {

    const farmId = req.params.farm_id

    Farm
        .findById(farmId)
        .populate('user')
        .then(theFarm => { res.render('farms/farm-details', theFarm) })
        .catch(err => next(new Error(err)))

})


//REGEX escape
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}



module.exports = router