const weekFormModel = require('../../models/weekForm');

const getUser = require('../user/getUser');

async function createWeekForm(formId, churchId, weekData, creatorId, tenths, offers, expenses) {

    //  Loading previous balance
    var lastBalance = 0;
    var previousFormData = await weekFormModel.find({churchId: churchId}).sort({ _id: -1 });

    if (previousFormData[0]) {
        lastBalance = previousFormData[0].balance;
    } else {
        if (churchId == 'sede'){
            lastBalance = process.env.FIRST_BALANCE_SEDE; 
        } else if (churchId == 'cohab'){
            lastBalance = process.env.FIRST_BALANCE_COHAB;
        } else if (churchId == 'saude'){
            lastBalance = process.env.FIRST_BALANCE_SAUDE;
        }
    }

    //  Retunring creator data
    const creatorData = await getUser(creatorId);
    
    //  Calculating total entries
    const totalEntries = parseFloat(lastBalance) + parseFloat(tenths) + parseFloat(offers);

    //  Calculating de sum of expenses
    var totalExpenses = expenses.reduce((sumExpanses, expanse) => {
        return sumExpanses + expanse.value
    }, 0);

    //  Calculating balance of week
    const balance = (totalEntries - totalExpenses).toFixed(2);

    totalExpenses = totalExpenses.toFixed(2);

    try {
        const formCreated = await weekFormModel.create(
            {
                formId,
                churchId,
                weekData,
                lastBalance,
                creatorData,
                expenses,
                tenths,
                offers,
                totalEntries,
                totalExpenses,
                balance,
                isActive: true
            }
        )

        return formCreated;
    } catch (error) {
        if (error.keyValue.formId) {
            return {
                status: "error",
                errorId: "createform_1",
                message: "FORM_ALREADY_EXISTS",
            }
        } else {
            return error;
        }
    }
}

module.exports = createWeekForm;