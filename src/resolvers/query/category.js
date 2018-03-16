const {getUserId} = require('../utils/auth_util')

const category = {

    category(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.category(args, info)
    },

    categories(parent, args, ctx, info) {
        const id = getUserId(ctx)

        if (!args.where) {
            args.where = {}
        }

        args.where.user = {id}

        return ctx.db.query.categories(args, info)
    },

}

module.exports = {category}
