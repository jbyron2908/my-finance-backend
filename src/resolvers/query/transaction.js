const {getUserId} = require('../utils/auth_util')

const transaction = {

    transaction(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.transaction(args, info)
    },

    transactions(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.transactions(args, info)
    },

}

module.exports = {transaction}
