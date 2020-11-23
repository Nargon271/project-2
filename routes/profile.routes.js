const express = require('express')
const router = express.Router()

const User = require('../models/user.model')
const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Not authorized' })


router.get('/', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => {


    Product
        .find()
        .populate('Farm')
        .then(allProducts => res.render('profiles/profile', { allProducts, user: req.user, isFarmer: req.user.role.includes('FARMER'), isBuyer: req.user.role.includes('BUYER'), uncompleted: req.user.farmname.includes('unknown') }))
        .catch(err => console.log(err))
})


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


//--------BUYER-----------//

//Create/Edit BUYER FORM (GET)
router.get('/edit-buyer', (req, res) => {

    const farmId = req.query.id

    Farm
        .findById(farmId)
        .then(farmInfo => res.render('profiles/buyer-edit', { farmInfo }))
        .catch(err => console.log(err))

})
//Create/Edit BUYER FORM (POST)
router.post('/edit-buyer', (req, res) => {

    const farmId = req.query.id
    const { name, surname, username, password, email, profileImg, address } = req.body


    Farm
        .findByIdAndUpdate(farmId, { name, surname, username, password, email, profileImg, address })
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
})

//-------------BUYER-------------//


//CREATE Product FORM (GET)
router.get('/:id/create-product', (req, res) => {
    const farmId = req.params.id

    Farm
        .findById(farmId)
        .then(farmInfo => {
            console.log("informacion", farmInfo)
            res.render('products/product-new', { farmInfo })
        })
        .catch(err => console.log('Error:', err))
})

//CREATE Product FORM (POST)
router.post('/:id/create-product', (req, res, next) => {
    const { name, description, profileImg, price, stock, farm } = req.body
    const farmId = req.params.id

    Product.create({ name, description, profileImg, price, stock, farm: farmId })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))

})


//EDIT Product FORM(GET)
router.get('/:id/edit-product', (req, res, next) => {
    const farmId = req.params.farm_id
    const productId = req.query.id

    Product
        .findById(productId)
        .then(productInfo => res.render('products/edit-product', productInfo))
        .catch(err => console.log('Error:', err))

})


//EDIT Product FORM (POST)
router.post('/:id/edit-product', (req, res, next) => {
    const farmId = req.params.id
    const productId = req.query.id

    const { name, description, productImg, price, stock } = req.body

    Product
        .findByIdAndUpdate(productId, { name, description, productImg, price, stock })
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))

})

//DELETE Product FORM (GET)
router.get('/:id/delete-product', (req, res, next) => {
    Product.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/profile'))
        .catch(err => console.log('Error:', err))
})



// router.get('/:id', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => {

//     const farmId = req.params.id

//     Promise.all([Farm.findById(farmId), Product.find().populate('Farm')])
//         .then(data => {
//             console.log(data)
//             res.render('profiles/profile', { farmId: data[0], allProducts: data[1] })
//         })
//         .catch(err => console.log('Error:', err))
// })



module.exports = router