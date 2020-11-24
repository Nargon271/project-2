const express = require('express')
const router = express.Router()

//brcipt
const bcrypt = require('bcryptjs')
const bcryptSalt = 10

const User = require('../models/user.model')
const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

//cloudinary
const CDNupload = require('./../configs/cdn-upload.config')

//midlewares
const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Not authorized' })

//NOT CHECKED
router.get('/', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => {
    Farm
        .find({ user: req.user.id })
        .populate('user')
        .then(allFarms => res.render('profiles/profile', { allFarms, user: req.user, isFarmer: req.user.role.includes('FARMER'), isBuyer: req.user.role.includes('BUYER') }))
        .catch(err => console.log(err))
})


//Create/Edit Farm FORM (GET) CHECKED
router.get('/create-farm', (req, res) => {

    const userId = req.query.id

    Farm
        .findById(userId)
        .populate('user')
        .then(userInfo => res.render('profiles/farmer-new', { user: userId, userInfo }))
        .catch(err => console.log(err))

})
//Create/Edit Farm FORM (POST) CHECKED
router.post('/create-farm', CDNupload.single('farmImg'), (req, res) => {

    const userId = req.query.id
    const { farmname, description, address, latitude, longitude, farmImg, user } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Farm
        .create({ farmname, description, address, location, farmImg, user: userId })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

//--------BUYER-----------//

//Create/Edit BUYER FORM (GET) CHECKED
router.get('/edit-user', (req, res) => {

    const userId = req.query.id

    User
        .findById(userId)
        .then(userInfo => res.render('profiles/user-edit', { userInfo }))
        .catch(err => console.log(err))

})
//Create/Edit BUYER FORM (POST) CHECKED
router.post('/edit-user', (req, res) => {

    const userId = req.query.id
    const { name, surname, username, password, email, profileImg } = req.body


    User
        .findByIdAndUpdate(userId, { name, surname, username, email, profileImg })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

//-------------BUYER-------------//

router.get('/myfarm/:id', (req, res) => {
    const farmId = req.params.id
    Promise.all([Farm.findById(farmId).populate('user'), Product.find({ farm: req.params.id}).populate('farm')])
        .then(data => {
            console.log(data)
            res.render('profiles/myfarm', { farmInfo: data[0], allProducts: data[1] })
        })
        .catch(err => console.log(err))

})

//CREATE Product FORM (GET)
router.get('/myfarm/:id/create-product', (req, res) => {
    const farmId = req.params.id

    Farm
        .findById(farmId)
        .populate('user')
        .then(farmInfo => {
            console.log(farmInfo)
            res.render('products/product-new', { farmInfo })
        })
        .catch(err => console.log('Error:', err))
})

//CREATE Product FORM (POST)
router.post('/myfarm/:id/create-product', (req, res, next) => {
    const { name, description, profileImg, price, stock, farm } = req.body
    const farmId = req.params.id

    Product.create({ name, description, profileImg, price, stock, farm: farmId })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))

})


//EDIT Product FORM(GET)
router.get('/myfarm/:id/edit-product', (req, res, next) => {
    const farmId = req.params.farm_id
    const productId = req.query.id

    Product
        .findById(productId)
        .then(productInfo => res.render('products/edit-product', productInfo))
        .catch(err => console.log('Error:', err))

})


//EDIT Product FORM (POST)
router.post('/myfarm/:id/edit-product', (req, res, next) => {
    const farmId = req.params.id
    const productId = req.query.id

    const { name, description, productImg, price, stock } = req.body

    Product
        .findByIdAndUpdate(productId, { name, description, productImg, price, stock })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))

})

//DELETE Product FORM (GET)
router.get('/myfarm/:id/delete-product', (req, res, next) => {
    Product.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))
})

module.exports = router