const Subscription = {
    transactionSubscription: {
        subscribe: (parent, args, ctx, info) => {
            return ctx.db.subscription.transaction({}, info)
        },
    },
}

module.exports = { Subscription }
