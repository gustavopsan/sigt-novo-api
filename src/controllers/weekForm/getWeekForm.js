const weekFormModel = require('../../models/weekForm');

async function getWeekForm(formId) {
    try {
        const formSelected = await weekFormModel.findOne({ formId: formId });

        if (formSelected) {
            return formSelected;
        } else {
            return {
                status: "error",
                errorId: "getform_1",
                message: "FORM_NOT_FOUND"
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = getWeekForm;