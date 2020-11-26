const ensureAuthenticated = (req, res, next) => req.isAuthenticated() ? next() : res.render('auth/login-form', { errorMsg: 'You are not authorized, please log in' })

module.exports = ensureAuthenticated