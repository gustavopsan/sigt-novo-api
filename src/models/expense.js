const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        churchId: "String",
        description: "String",
        value: "Decimal",
        date: "Object",
        week: "String",
        category: "String",
        isUsed: "Boolean",
    },
    {
        timestamps: true
    }
);

const decimal2JSON = (v, i, prev) => {
    if (v !== null && typeof v === 'object') {
       if (v.constructor.name === 'Decimal128')
          prev[i] = parseFloat(v);
       else
          Object.entries(v).forEach(([key, value]) => decimal2JSON(value, key, prev ? prev[i] : v));
    }
};

expenseSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const Expense = mongoose.model('expense', expenseSchema);

module.exports = Expense;