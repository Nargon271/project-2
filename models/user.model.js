const mongoose = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Desconicido'
    },
    surName: {
        type: String,
        required: true,
        default: 'Desconicido'
    },
    farmName: {
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
        required: true

    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    }
}, { timestamps: true })

farmSchema.index({ location: '2dsphere' })

const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm