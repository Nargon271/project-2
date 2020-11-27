const user = req => req.user

const isFarmer = req => req.user.role.includes('FARMER')
const isBuyer = req => req.user.role.includes('BUYER')

module.exports.user = user
module.exports.isFarmer = isFarmer
module.exports.isBuyer = isBuyer 