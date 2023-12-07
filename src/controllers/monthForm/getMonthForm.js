const monthFormModel = require('../../models/monthForm');

async function getMonthForm(formId) {
    try {
        const formSelected = await monthFormModel.findOne({ formId: formId });

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

module.exports = getMonthForm;