const PixBillingModel = require("../../models/pixBilling");
const BilletBillingModel = require("../../models/billetBilling");

async function listBillingRequests(page) {
    try {
        const pixBillings = await PixBillingModel.find().sort({_id: -1}).limit(5).skip(5 * (page - 1));
        const billetBillings = await BilletBillingModel.find().sort({_id: -1}).limit(5).skip(5 * (page - 1));

        let billings = [];

        for (const billing of pixBillings) {
            billings.push({...billing.toJSON()});
        }

        for (const billing of billetBillings) {
            billings.push({...billing.toJSON()});
        }

        return billings;

    } catch (error) {
        return error;
    }

    
}

module.exports = listBillingRequests;