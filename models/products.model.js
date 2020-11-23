const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: String,
        productImg: String,
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'       
        }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;