const expenseModel = require('../../models/expense');

async function removeExpense(id) {
    try {
        const removedExpense = await expenseModel.findByIdAndDelete(id);

        return removedExpense;
    } catch (error) {
        return error;
    }
}

module.exports = removeExpense;