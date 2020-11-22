const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

// Endpoints
//router.get('/', (req, res) => res.render('products/products-list'))


// Products List
router.get('/', (req, res, next) => {


    Product
        .find()
        .populate('Farm')
        .then(allProducts => res.render('products/products-list', { allProducts }))
        .catch(err => next(new Error(err)))
})


// Products List
router.get('/:product_id', (req, res) => {

    const productId = req.params.product_id

    Product
        .findById(productId)
        .populate('Farm')
        .then(productInfo => {
            console.log(productInfo.farm.farmname)
            res.render('products/product-details', productInfo)
        })
        .catch(err => next(new Error(err)))

})



module.exports = router