const {getUserId} = require('../utils/auth_util')

const account = {

    account(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.account(args, info)
    },

    accounts(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.accounts(args, info)
    },

}

module.exports = {account}
