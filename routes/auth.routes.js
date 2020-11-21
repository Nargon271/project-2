const express = require('express')
const router = express.Router()
const passport = require("passport")

//models



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

router.post('sign-up', (req, res) => {
    
})

module.exports = router