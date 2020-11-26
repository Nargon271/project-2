const express = require('express')
const router = express.Router()

// Models
const User = require('../models/user.model')
const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

// Cloudinary
const CDNupload = require('./../configs/cdn-upload.config')

// Middlewares
const ensureAuthenticated = require('./../configs/custom.middleware')


// Endpoints
router.get('/log-out', (req, res) => req.session.destroy((err) => res.redirect("/")))


router.get('/', ensureAuthenticated, (req, res, next) => {
    
    const farmPromise = Farm.find({ user: req.user.id }).populate('user')
    const userPromise = User.findById(req.user.id).populate('favorites')
    
    Promise.all([farmPromise, userPromise])
        .then(data => res.render('profiles/profile', { allFarms: data[0], user: req.user, isFarmer: req.user.role.includes('FARMER'), isBuyer: req.user.role.includes('BUYER'), userInfo: data[1].favorites }))
        .catch(err => next(new Error(err)))
})


// Create Farm FORM (GET)
router.get('/create-farm', ensureAuthenticated, (req, res, next) => {

    const userId = req.query.id

    Farm
        .findById(userId)
        .populate('user')
        .then(userInfo => res.render('profiles/farmer-new', { user: userId, userInfo }))
        .catch(err => next(new Error(err)))
})


// Create Farm FORM (POST)
router.post('/create-farm', ensureAuthenticated, CDNupload.single('farmImg'), (req, res, next) => {

    const userId = req.query.id
    const farmImage = {
        imageName: req.body.imageName,
        path: req.file.path,
        originalName: req.file.originalname
    }
    const { farmname, description, address, latitude, longitude } = req.body

    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Farm
        .create({ farmname, description, address, location, farmImg: farmImage, user: userId })
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})


// Edit User FORM (GET)
router.get('/edit-user', ensureAuthenticated, (req, res, next) => {

    const userId = req.query.id

    User
        .findById(userId)
        .then(userInfo => res.render('profiles/user-edit', { userInfo }))
        .catch(err => next(new Error(err)))
})


// Edit User FORM (POST)
router.post('/edit-user', ensureAuthenticated, CDNupload.single('profileImg'), (req, res, next) => {

    const userId = req.query.id
    const profileImage = {
        imageName: req.body.imageName,
        path: req.file.path,
        originalName: req.file.originalname
    }
    const { name, surname, username, email } = req.body

    User
        .findByIdAndUpdate(userId, { name, surname, username, email, profileImg: profileImage })
        .then(() => res.redirect('/'))
        .catch(err => next(new Error(err)))
})


// Show farm data
router.get('/myfarm/:id', ensureAuthenticated, (req, res, next) => {
    
    const farmId = req.params.id
    const farmPromise = Farm.findById(farmId).populate('user')
    const productPromise = Product.find({ farm: req.params.id }).populate('farm')
    
    Promise.all([farmPromise, productPromise])
        .then(data => res.render('profiles/myfarm', { farmInfo: data[0], allProducts: data[1] }))
        .catch(err => next(new Error(err)))
})


// Create Product FORM (GET)
router.get('/myfarm/:id/create-product', ensureAuthenticated, (req, res, next) => {
    
    const farmId = req.params.id

    Farm
        .findById(farmId)
        .populate('user')
        .then(farmInfo => res.render('products/product-new', { farmInfo }))
        .catch(err => next(new Error(err)))
})


// Create Product FORM (POST)
router.post('/myfarm/:id/create-product', ensureAuthenticated, CDNupload.single('productImg'), (req, res, next) => {
    
    const { name, description, price, stock } = req.body
    const farmId = req.params.id
    const productImage = {
        imageName: req.body.imageName,
        path: req.file.path,
        originalName: req.file.originalname
    }

    Product.create({ name, description, productImg: productImage, price, stock, farm: farmId })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


// Edit Farm FORM (GET) 
router.get('/myfarm/:id/edit', ensureAuthenticated, (req, res, next) => {

    const farmId = req.params.id

    Farm
        .findById(farmId)
        .populate('user')
        .then(farmInfo => res.render('profiles/farmer-edit', { farm: farmId, farmInfo }))
        .catch(err => next(new Error(err)))
})


// Edit Farm FORM (POST)
router.post('/myfarm/:id/edit', ensureAuthenticated, CDNupload.single('farmImg'), (req, res, next) => {

    const farmId = req.params.id
    const farmImage = {
        imageName: req.body.imageName,
        path: req.file.path,
        originalName: req.file.originalname
    }
    const { farmname, description, address, latitude, longitude } = req.body
    const location = {
        type: 'Point',
        coordinates: [latitude, longitude]
    }

    Farm
        .findByIdAndUpdate(farmId, { farmname, description, address, location, farmImg: farmImage })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


// Edit Farm FORM (GET) 
router.get('/myfarm/:id/delete', ensureAuthenticated, (req, res, next) => {
   
    const farmId = req.params.id
    
    Farm
        .findByIdAndDelete(farmId)
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})


// Edit Product FORM(GET)
router.get('/myfarm/:id/edit-product', ensureAuthenticated, (req, res, next) => {
    
    const productId = req.query.id

    Product
        .findById(productId)
        .then(productInfo => res.render('products/edit-product', productInfo))
        .catch(err => next(new Error(err)))
})


// Edit Product FORM (POST)
router.post('/myfarm/:id/edit-product', ensureAuthenticated, CDNupload.single('productImg'), (req, res, next) => {
    
    const productId = req.query.id
    const productImage = {
        imageName: req.body.imageName,
        path: req.file.path,
        originalName: req.file.originalname
    }

    const { name, description, price, stock } = req.body

    Product
        .findByIdAndUpdate(productId, { name, description, productImg: productImage, price, stock })
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))
})

//DELETE Product FORM (GET)
router.get('/myfarm/:id/delete-product', ensureAuthenticated, (req, res, next) => {
    
    Product.findByIdAndDelete(req.query.id)
        .then(() => res.redirect('/profile'))
        .catch(err => next(new Error(err)))})

module.exports = router