const subscriptionModel = require('../../models/subscription');

async function updateSubscription(subscriptionId, key, value) {
    try {
        const subscription = await subscriptionModel.findByIdAndUpdate(
            { _id: subscriptionId },
            { [key]: value },
            { new: false }
        )

        if (subscription) {
            const subscriptionUpdated = await subscriptionModel.findById(
                { _id: subscriptionId }
            );

            return subscriptionUpdated;
        }
    } catch (error) {
        return error;
    }
}

module.exports = updateSubscription;