const mongoose = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Desconocido'
    },
    surname: {
        type: String,
        required: true,
        default: 'Desconicido'
    },
    farmname: {
        type: String,
        unique: true,
        default: 'unknown'
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: 'unknown'
    },
    role: {
        type: String,
        enum: ['BUYER', 'FARMER', 'ADMIN'],
        default: 'BUYER'
    },
    profileImg: {
        type: String,
        default: 'unknown'
    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number], 
    },
    address: {
        type: String,
        default: "unknown"
    },

}, { timestamps: true })

farmSchema.index({ location: '2dsphere' })

const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm