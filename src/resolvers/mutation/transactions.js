const {getUserId} = require('../utils/auth_util')
const moment = require("moment")

const transaction = {

    async createTransaction(parent, {data}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.createTransaction(
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

    async updateTransaction(parent, {data, where}, ctx, info) {

        await checkTransactionExist(ctx, where)

        return ctx.db.mutation.updateTransaction(
            {
                where,
                data
            }
        )
    },

    async updateTransactions(parent, {data, where}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.updateManyTransactions(
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

    async deleteTransaction(parent, {where}, ctx, info) {

        await checkTransactionExist(ctx, where)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateTransaction(
            {
                where,
                data: {
                    delete: true,
                    deleteDate
                }
            })
    },

    async deleteTransactions(parent, {where}, ctx, info) {
        const userId = getUserId(ctx)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateManyTransactions(
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

const checkTransactionExist = async (ctx, where) => {
    const userId = getUserId(ctx)
    const transactionExists = await ctx.db.exists.Transaction({
        ...where,
        user: {id: userId},
    })

    if (!transactionExists) {
        throw new Error(`Transaction not found or you're not the owner`)
    }
}

module.exports = {transaction}
