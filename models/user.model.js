const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
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
        password: {
            type: String,
            required: true
        },
        profileImg: String,
    },
    {
        timestamps: true
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;