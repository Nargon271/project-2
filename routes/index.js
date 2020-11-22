module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/products', require('./products.routes.js'))
    app.use('/farms', require('./farms.routes.js'))
    app.use('/auth', require('./auth.routes.js'))
    app.use('/profile', require('./profile.routes.js'))
    app.use('/api', require('./api.routes.js'))
}