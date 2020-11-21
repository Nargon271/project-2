module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/products', require('./products.routes.js'))
    app.use('/farms', require('./farms.routes.js'))
    app.use('/', require('./auth.routes.js'))
}