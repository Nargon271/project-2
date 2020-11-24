const mongoose = require('mongoose')
const Schema = mongoose.Schema

const farmSchema = new Schema({
    farmname: {
        type: String,
        unique: true,
        default: 'unknown'
    },
    description: {
        type: String,
        default: 'unknown'
    },
    farmImg: {
        imageName: String,
        path: String,
        originalName: String
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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

farmSchema.index({ location: '2dsphere' })

const Farm = mongoose.model('Farm', farmSchema)

module.exports = Farm