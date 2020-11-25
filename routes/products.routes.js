const { text } = require('body-parser')
const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')
const Product = require('../models/products.model')

// Endpoints

// Products List
router.get('/', (req, res, next) => {

    const query = req.query.search ? { name: new RegExp(escapeRegExp(req.query.search), 'gi') } : {}

    //Get the product from DB which match the query
    Product
        .find(query, { name: 1, productImg: 1 })
        .populate('farm')
        .then(allProducts => res.render('products/products-list', { allProducts }))
        .catch(err => next(new Error(err)))

})


// Products Details
router.get('/:product_id', (req, res) => {

    const productId = req.params.product_id

    Product
        .findById(productId)
        .populate('farm')
        .then(productInfo => { res.render('products/product-details', productInfo) })
        .catch(err => console.log(err))

})


//REGEX escape
function escapeRegExp(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


module.exports = router