const expenseModel = require('../../models/expense');

async function updateExpense(id, key, newvalue) {
    try {
        const expense = await expenseModel.findByIdAndUpdate(
            { _id: id },
            { [key]: newvalue },
            { new: true }
        )

        if (expense) {
            const expenseUpdated = await expenseModel.findById(
                { _id: id }
            );

            return expenseUpdated;
        }
    } catch (error) {
        return error;
    }
}

module.exports = updateExpense;