const {getUserId} = require('../utils/auth_util')

const auth = {

    me(parent, args, ctx, info) {
        const id = getUserId(ctx)
        return ctx.db.query.user({where: {id}}, info)
    },

}

module.exports = {auth}
