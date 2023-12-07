const monthFormModel = require('../../models/monthForm');

async function loadYearData(year, churchId) {
    try {
        const forms = await monthFormModel.find({ 'monthData.year': year, 'churchId': churchId });

        var treatedData = {};

        if (forms) {
            var allTenths = [];
            var allOffers = [];
            var allBalances = [];
            var allEntries = [];
            var allExpenses = [];

            forms.forEach(form => {
                allTenths.push(form.toJSON().tenths);
                allOffers.push(form.toJSON().offers);
                allBalances.push(form.toJSON().balance);

                var entries = parseFloat(form.toJSON().tenths) + parseFloat(form.toJSON().offers);
                allEntries.push(entries);
                allExpenses.push(form.toJSON().totalExpenses);
            })

            treatedData.tenths = allTenths;
            treatedData.offers = allOffers;
            treatedData.balances = allBalances;
            treatedData.entries = allEntries;
            treatedData.expenses = allExpenses;
            
            return treatedData;
        } else {
            return {
                status: "error",
                errorId: "loadforms_1",
                message: "FORMS_NOT_FOUND"
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = loadYearData;
