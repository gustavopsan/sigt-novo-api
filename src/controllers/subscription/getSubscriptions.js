const subscriptionModel = require('../../models/subscription');

async function getSubscriptions() {
    try {
        const subscriptions = await subscriptionModel.find();
        
        return subscriptions;
    } catch (error) {
        return error;
    }
}

module.exports = getSubscriptions;