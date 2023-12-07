const mongoose = require('mongoose');

const weekFormSchema = new mongoose.Schema(
    {
        formId: {
            type: "String",
            unique: true
        },
        weekData: "Object",
        churchId: "String",
        lastBalance: "Decimal",
        creatorData: "Object",
        expenses: "Array",
        tenths: "Decimal",
        offers: "Decimal",
        totalEntries: "Decimal",
        totalExpenses: "Decimal",
        balance: "Decimal",
        isActive: "Boolean"
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
 
weekFormSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
})

const WeekForm = mongoose.model("WeekForm", weekFormSchema);

module.exports = WeekForm;