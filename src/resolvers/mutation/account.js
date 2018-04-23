const {getUserId} = require('../utils/auth_util')
const moment = require("moment")

const account = {

    async createAccount(parent, {data}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.createAccount(
            {
                data: {
                    ...data,
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                },
            }
        )
    },

    async updateAccount(parent, {data, where}, ctx, info) {

        await checkAccountExist(ctx, where)

        return ctx.db.mutation.updateAccount(
            {
                where,
                data
            }
        )
    },

    async updateAccounts(parent, {data, where}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.updateManyAccounts(
            {
                where: {
                    ...where,
                    user: {
                        id: userId
                    }
                },
                data
            }
        )
    },

    async deleteAccount(parent, {where}, ctx, info) {

        await checkAccountExist(ctx, where)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateAccount(
            {
                where,
                data: {
                    delete: true,
                    deleteDate
                }
            })
    },

    async deleteAccounts(parent, {where}, ctx, info) {
        const userId = getUserId(ctx)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateManyAccounts(
            {
                where: {
                    ...where,
                    user: {
                        id: userId
                    }
                },
                data: {
                    delete: true,
                    deleteDate
                }
            })
    },

}

const checkAccountExist = async (ctx, where) => {
    const userId = getUserId(ctx)
    const accountExists = await ctx.db.exists.Account({
        ...where,
        user: {id: userId},
    })

    if (!accountExists) {
        throw new Error(`Account not found or you're not the owner`)
    }
}

module.exports = {account}
