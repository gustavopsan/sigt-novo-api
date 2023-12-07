const mongoose = require('mongoose');

const monthFormSchema = new mongoose.Schema(
    {
        formId: {
            type: "String",
            unique: true
        },
        churchId: "String",
        monthData: "Object",
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
 
monthFormSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
})

const MonthForm = mongoose.model("MonthForm", monthFormSchema);

module.exports = MonthForm;
