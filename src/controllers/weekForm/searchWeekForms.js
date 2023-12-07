const weekFormModel = require('../../models/weekForm');

async function searchWeekForms(churchId, monthId, year) {
    try {
        const weekForms = await weekFormModel.find({ churchId: churchId, 'weekData.monthId': monthId, 'weekData.year': year}).sort({_id: 1});
        let formIds = [];

        for (const form of weekForms) {
            formIds.push(form.formId);
        }

        return formIds;
    } catch (error) {
        return error;
    }
}

module.exports = searchWeekForms;