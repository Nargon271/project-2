const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, no tienes permisos' })


router.get('/', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => res.render('profiles/profile', { user: req.user, isFarmer: req.user.role.includes('FARMER'), uncompleted: req.user.farmname.includes('unknown') }))

//Create Farm FORM
router.get('/create-farm', (req, res) => {

    const farmId = req.query.id

    Farm
        .findById(farmId)
        .then(farmInfo => res.render('profiles/farmer-new', { farmInfo }))
        .catch(err => console.log(err))
    
})

router.post('/create-farm', (req, res) => {

    const farmId = req.query.id
    const { farmname, description, address, latitude, longitude, profileImg } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Farm
        .findByIdAndUpdate(farmId, { farmname, description, address, location, profileImg })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})


module.exports = router