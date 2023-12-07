const expenseModel = require('../../models/expense');

async function listExpenses() {
    try {
        const expenses = await expenseModel.find();
        return expenses;
    } catch (error) {
        return error;
    }
}

module.exports = listExpenses;