const weekFormModel = require('../../models/weekForm');
const monthFormModel = require('../../models/monthForm');

async function searchForms(churchId, monthId, year) {
    try {
        const weekForms = await weekFormModel.find({ churchId: churchId, 'weekData.monthId': monthId, 'weekData.year': year}).sort({_id: 1});
        const monthForms = await monthFormModel.find({ churchId: churchId, 'monthData.monthId': monthId, 'monthData.year': year }).sort({_id: -1});

        let searchForms = [];

        for (const form of weekForms) {
            searchForms.push({...form.toJSON()});
        }

        for (const form of monthForms) {
            searchForms.push({...form.toJSON()});
        }

        return searchForms;
    } catch (error) {
        return error;
    }
}

module.exports = searchForms;