const mongoose = require('mongoose')
const User = require('./../models/user.model')
//DATABASE
const dbName = 'farmproject'
mongoose.connect(process.env.DB_REMOTE)

//bcriptjs
const bcrypt = require("bcryptjs")
const bcryptSalt = 10

const salt = bcrypt.genSaltSync(bcryptSalt)
const password1 = "popino"
const hashPass1 = bcrypt.hashSync(password1, salt)

const password2 = "popino"
const hashPass2 = bcrypt.hashSync(password2, salt)

const users = [
    {
        name: "Jose",
        surname: "Coronado",
        email: "josecorona2@gmail.com",
        username: "josele",
        password: hashPass1,
        role: "BUYER",
        profileImg: "",
        favorites: []
    },
    {
        name: "Jacinto",
        surname: "Jeremias",
        email: "bodigogrande@gmail.com",
        username: "jacinto",
        password: hashPass2,
        role: "BUYER",
        profileImg: "",
        favorites: []
    }
]

User
    .create(users)
    .then(allusersCreated => {
        console.log(`Created ${allusersCreated.length} users`)
        mongoose.connection.close()
    })
    .catch(err => console.log('An error occured', err))