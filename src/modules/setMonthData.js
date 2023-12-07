const weekFormModel = require('../models/weekForm');

async function setMonthData(weekFormIds) {
    try {
        var monthExpenses = [];
        var tenths = 0;
        var offers = 0;

        for (const id of weekFormIds) {
            const form = await weekFormModel.findOne({ formId: id });
            const weekExpenses = [];

            for (const array of form.expenses) {
                weekExpenses.push(...array);
            }

            monthExpenses.push(...weekExpenses);    // Joinind all the month expenses
            tenths = parseFloat(tenths) + parseFloat(form.tenths);  // Getting the sum of month tenths
            offers = parseFloat(offers) + parseFloat(form.offers);  // Getting the sum of month offers
        }

        return {
            monthExpenses,
            tenths,
            offers
        }
    } catch (error) {
        return error;
    }
}

module.exports = setMonthData;