const mongoose = require('mongoose');

const weekEntrySchema = new mongoose.Schema(
    {
        entryId: "String",
        churchId: "String",
        week: "String",
        decimists: "Array",
        tenths: "Decimal",
        offers: "Decimal",
        totalEntries: "Decimal",
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

weekEntrySchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const WeekEntry = mongoose.model('WeekEntry', weekEntrySchema);

module.exports = WeekEntry;