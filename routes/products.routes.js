const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

// Endpoints

// Products List
router.get('/', (req, res, next) => {

    Product
        .find()
        .populate('farm')
        .then(allProducts => res.render('products/products-list', { allProducts }))
        .catch(err => next(new Error(err)))
})


// Products List
router.get('/:product_id', (req, res) => {

    const productId = req.params.product_id

    Product
        .findById(productId)
        .populate('farm')
        .then(productInfo => { res.render('products/product-details', productInfo) })
        .catch(err => next(new Error(err)))

})



module.exports = router