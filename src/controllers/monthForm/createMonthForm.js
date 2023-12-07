const monthFormModel = require('../../models/monthForm');
const setMonthData = require('../../modules/setMonthData');
const getUser = require('../user/getUser');

async function createMonthForm(formId, weekFormIds, churchId, monthData, creatorId) {
    
    //  Loading previous balance
    var lastBalance = 0;
    var previousFormData = await monthFormModel.find({churchId: churchId}).sort({ _id: -1 });

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

    //  Returning creator data
    const creatorData = await getUser(creatorId);

    //  Joining distinct weeks data of month
    var joinedMonthData = await setMonthData(weekFormIds);

    var expenses = joinedMonthData.monthExpenses;
    var tenths = joinedMonthData.tenths;
    var offers = joinedMonthData.offers;

    //  Calculating total entries
    var totalEntries = parseFloat((parseFloat(lastBalance) + parseFloat(tenths) + parseFloat(offers)).toFixed(2));

    //  Calculating de sum of expenses
    var totalExpenses = expenses.reduce((sumExpanses, expanse) => {
        return sumExpanses + expanse.value
    }, 0);

    //  Calculating balance of week
    var balance = parseFloat((totalEntries - totalExpenses).toFixed(2));

    totalExpenses = parseFloat(totalExpenses.toFixed(2));

    try {
        const formCreated = await monthFormModel.create(
            {
                formId,
                churchId,
                monthData,
                lastBalance,
                creatorData,
                expenses,
                tenths,
                offers,
                totalEntries,
                totalExpenses,
                balance
            }
        );

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

module.exports = createMonthForm;