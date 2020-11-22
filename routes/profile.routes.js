const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Not authorized' })


router.get('/', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => {
    Product
        .find()
        .populate('Farm')
        .then(allProducts => res.render('profiles/profile', { allProducts, user: req.user, isFarmer: req.user.role.includes('FARMER'), uncompleted: req.user.farmname.includes('unknown') }))
        .catch(err => console.log(err))
})


//////////////////////////////////////////////////////////////

//Create/Edit Farm FORM (GET)
router.get('/create-farm', (req, res) => {

    const farmId = req.query.id

    Farm
        .findById(farmId)
        .then(farmInfo => res.render('profiles/farmer-new', { farmInfo }))
        .catch(err => console.log(err))

})
//Create/Edit Farm FORM (POST)
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

//////////////////////////////////////////////////////////////



//Create Product FORM (GET)
router.get('/create-product', (req, res, next) => {
    const farmId = req.query.id

    Farm
        .findById(farmId)
        .then(allFarms => res.render('products/product-new', { allFarms }))
        .catch(err => console.log(err))

})


//Create Product FORM (POST)
router.post('/create-product', (req, res, next) => {
    const { name, description, profileImg, price, stock, farm } = req.body

    Product
        .create({ name, description, profileImg, price, stock, farm_id: farm })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


//////////////////////////////////////////////////////////////


//EDIT Product FORM (GET)
router.get('/edit', (req, res, next) => {

    const productId = req.query.id

    Product
        .findById(productId)
        .then(productInfo => res.render('products/edit-product', productInfo))
        .catch(err => next(new Error(err)))

})

//EDIT Product FORM (POST)
router.post('/edit', (req, res, next) => {

    const productId = req.query.id

    const { name, description, productImg, price, stock, farm } = req.body

    Product
        .findByIdAndUpdate(productId, { name, description, productImg, price, stock, farm })
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))

})











module.exports = router