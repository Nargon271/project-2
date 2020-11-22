const express = require('express')
const router = express.Router()
const passport = require("passport")

//models
const Farm = require('../models/farm.model')


//bricpt
const bcrypt = require("bcryptjs")
const bcryptSalt = 10

//Log in
router.get('/log-in', (req, res) => res.render('auth/login-form'))

router.post("/log-in", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/log-in",
    failureFlash: true,
    passReqToCallback: true
}))

//Sign up
router.get('/sign-up', (req, res) => res.render('auth/signup-form'))

router.post('/sign-up', (req, res) => {
    const { name, surname, username, email, password, role } = req.body


    if (username === "" || name === "" || password === "" || surname === "" || email === "" || role === "") {
        res.render("auth/signup-form", { errorMsg: "Fill all the fields" })
        return
    }

    Farm
        .findOne({ username })
        .then(user => {
            if (user) {
                res.render("auth/signup-form", { errorMsg: "User already exists" })
                return
            }

            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            Farm.create({ name, surname, username, email, password: hashPass, role })
                .then(() => res.redirect('/'))
                .catch(() => res.render("auth/signup-form", { errorMsg: "An error occured" }))
        })
        .catch(err => console.log(err))
})


module.exports = router