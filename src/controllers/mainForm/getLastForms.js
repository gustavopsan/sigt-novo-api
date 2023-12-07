const weekFormModel = require('../../models/weekForm');
const monthFormModel = require('../../models/monthForm');

async function getLastForms(weekAmount, monthAmount) {
    try {
        const weekForms = await weekFormModel.find().sort({_id: -1}).limit(weekAmount);
        const monthForms = await monthFormModel.find().sort({_id: -1}).limit(monthAmount);

        let lastForms = [];

        for (const form of weekForms) {
            lastForms.push({...form.toJSON()});
        }

        for (const form of monthForms) {
            lastForms.push({...form.toJSON()});
        }

        return lastForms;

    } catch (error) {
        return error;
    }
}

module.exports = getLastForms;