const { text } = require('body-parser')
const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

// Endpoints

// Products List
router.get('/', (req, res, next) => {
    if (req.query.search) {
        const regex = new RegExp(escapeRegExp(req.query.search), 'gi')

        //Get the product from DB which match the query
        Product
            .find({ name: regex })
            .populate('farm')
            .then(allProducts => res.render('products/products-list', { allProducts }))
            .catch(err => next(new Error(err)))

    } else {

        //Get all products from DB
        Product
            .find()
            .populate('farm')
            .then(allProducts => res.render('products/products-list', { allProducts }))
            .catch(err => next(new Error(err)))
    }

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


//REGEX escape
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


module.exports = router