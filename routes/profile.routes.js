const express = require('express')
const router = express.Router()

const Farm = require('../models/farm.model')

const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, inicia sesión' })
const checkRole = admittedRoles => (req, res, next) => admittedRoles.includes(req.user.role) ? next() : res.render('auth/login-form', { errorMsg: 'Desautorizado, no tienes permisos' })


router.get('/', ensureAuthenticated, checkRole(['FARMER', 'BUYER', 'ADMIN']), (req, res) => res.render('profiles/profile'), { user: req.user, isFarmer: req.user.role.includes('FARMER') })
router.get('/create-farm', (req, res) => res.render('profiles/farmer-new'))


module.exports = router