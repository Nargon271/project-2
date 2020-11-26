const escapeRegExp = text => ( text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'))

module.exports = escapeRegExp