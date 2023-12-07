const expenseModel = require('../../models/expense');

async function createExpense(churchId, description, value, date, category, week) {
    try {
        const expenseCreated = await expenseModel.create(
            {
                churchId,
                description,
                value,
                date,
                week,
                category,
                isUsed: false
            }
        );

        return expenseCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createExpense;