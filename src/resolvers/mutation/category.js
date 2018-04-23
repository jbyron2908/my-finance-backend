const {getUserId} = require('../utils/auth_util')
const moment = require("moment")

const category = {

    async createCategory(parent, {data}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.createCategory(
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

    async updateCategory(parent, {data, where}, ctx, info) {

        await checkCategoryExist(ctx, where)

        return ctx.db.mutation.updateCategory(
            {
                where,
                data
            }
        )
    },

    async updateCategories(parent, {data, where}, ctx, info) {
        const userId = getUserId(ctx)

        return ctx.db.mutation.updateManyCategories(
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

    async deleteCategory(parent, {where}, ctx, info) {

        await checkCategoryExist(ctx, where)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateCategory(
            {
                where,
                data: {
                    delete: true,
                    deleteDate
                }
            })
    },

    async deleteCategories(parent, {where}, ctx, info) {
        const userId = getUserId(ctx)

        const deleteDate = moment().toISOString()

        return ctx.db.mutation.updateManyCategories(
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

const checkCategoryExist = async (ctx, where) => {
    const userId = getUserId(ctx)
    const categoryExists = await ctx.db.exists.Category({
        ...where,
        user: {id: userId},
    })

    if (!categoryExists) {
        throw new Error(`Category not found or you're not the owner`)
    }
}

module.exports = {category}
