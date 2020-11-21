const express = require('express')
const router = express.Router()

// Endpoints
router.get('/', (req, res) => res.render('products/products-list'))




// Product details
// router.get('/:product_id', (req, res) => {

//     const productId = req.params.product_id

//     Product
//         .findById(productId)
//         .populate('farm')
//         .then(theProduct => { res.render('products/product-details', theProduct) })
//         .catch(err => console.log(err))

// })



module.exports = router