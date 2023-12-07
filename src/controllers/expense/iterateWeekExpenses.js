const expenseModel = require('../../models/expense');

async function iterateWeekExpenses(week, churchId) {
    try {
        const Expenses = await expenseModel.find({ churchId: churchId, week: week });

        return Expenses
    } catch (error) {
        return error;
    }
}

module.exports = iterateWeekExpenses