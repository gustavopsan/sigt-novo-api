const subscriptionModel = require('../../models/subscription');

async function removeSubscription(subscriptionId) {
    try {
        const deletedSubscription = await subscriptionModel.findByIdAndDelete(subscriptionId);

        return deletedSubscription;
    } catch (error) {
        return error;
    }
}

module.exports = removeSubscription;