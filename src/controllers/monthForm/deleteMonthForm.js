const monthFormModel = require('../../models/monthForm');

async function deleteMonthForm(formId) {
    try {
        const formDeleted = await monthFormModel.findOneAndDelete({formId: formId});

        return formDeleted;
    } catch (error) {
        return error;
    }
}

module.exports = deleteMonthForm;