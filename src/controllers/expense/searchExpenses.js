const expenseModel = require('../../models/expense');

async function searchExpenses(churchId) {
    try {
        const searchExpenses = await expenseModel.find({ churchId: churchId })

        return searchExpenses
    } catch (error) {
        return error;
    }
}

module.exports = searchExpenses