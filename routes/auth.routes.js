const express = require('express')
const router = express.Router()
const passport = require("passport")

// Models
const User = require('../models/user.model')

// Bricpt
const bcrypt = require('bcryptjs')
const bcryptSalt = 10

// Sign up
router.get('/sign-up', (req, res) => res.render('auth/signup-form'))


router.post('/sign-up', (req, res, next) => {
    
    const { name, surname, username, email, password, role } = req.body

    if (username === "" || name === "" || password === "" || surname === "" || email === "" || role === "") {
        res.render("auth/signup-form", { errorMsg: "Fill all the fields" })
        return
    }

    User
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup-form", { errorMsg: "User already exists" })
                return
            }
            let favs = []
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User.create({ name, surname, username, email, password: hashPass, role, favorites: favs })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup-form", { errorMsg: "An error occured" }))
        })
        .catch(err => next(new Error(err)))
})

// Log in
router.get('/log-in', (req, res) => res.render('auth/login-form'))


router.post('/log-in', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/auth/log-in',
    failureFlash: true,
    passReqToCallback: true
}))

module.exports = router