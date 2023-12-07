const mongoose = require('mongoose');

const pixBillingSchema = new mongoose.Schema(
    {
        txid: {
            type: "String",
            unique: true
        },
        description: "String",
        value: "Decimal",
        customerName: "String",
        customerEmail: "String",
        customerPhone: "String",
        url: "String",
        qrCode: "Object",
        active: "Boolean",
        originalData: "Object"
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

pixBillingSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const PixBilling = mongoose.model('PixBilling', pixBillingSchema);

module.exports = PixBilling;