const {auth} = require('./auth')
const {account} = require('./account')
const {category} = require('./category')
const {transaction} = require('./transaction')

const Query = {
    ...auth,
    ...account,
    ...category,
    ...transaction,
}

module.exports = {Query}
