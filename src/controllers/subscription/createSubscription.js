const subscriptionModel = require('../../models/subscription');

async function createSubscription(name, churchId, subscriptionType, subscriptionValue, subscriptionPaymentType, subscriptionPaymentStatus) {
    try {
        const subscriptionCreated = subscriptionModel.create(
            {
                name,
                churchId,
                subscriptionType,
                subscriptionValue,
                subscriptionPaymentId,
                subscriptionPaymentType,
                subscriptionPaymentStatus
            }
        );

        return subscriptionCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createSubscription;