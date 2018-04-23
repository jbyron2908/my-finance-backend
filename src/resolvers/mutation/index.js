const {auth} = require('./auth')
const {account} = require('./account')
const {category} = require('./category')
const {transaction} = require('./transactions')

const Mutation = {
    ...auth,
    ...account,
    ...category,
    ...transaction,
}

module.exports = {Mutation}
