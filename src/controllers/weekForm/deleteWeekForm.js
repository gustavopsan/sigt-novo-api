const weekFormModel = require('../../models/weekForm');

async function deleteWeekForm(formId) {
    try {
        const formDeleted = await weekFormModel.findOneAndDelete({formId: formId});

        return formDeleted;
    } catch (error) {
        return error;
    }
}

module.exports = deleteWeekForm;