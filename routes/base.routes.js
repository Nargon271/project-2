const express = require('express')
const router = express.Router()

// const Farm = require('../models/farm.model')

// const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, inicia sesión' })
// const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, no tienes permisos' })


// Endpoints

//router.get('/', checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => res.render('index'{ isFarmer: req.user.role.includes('FARMER'), isAdmin: req.user.role.includes('ADMIN'), isBuyer: req.user.role.includes('BUYER') } ))

router.get('/', (req, res) => res.render('index'))


module.exports = router
