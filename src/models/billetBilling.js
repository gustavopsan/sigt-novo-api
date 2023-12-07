const mongoose = require('mongoose');

const billetBillingSchema = new mongoose.Schema(
    {
        chargeId: {
            type: 'Number',
            unique: true
        },
        customerName: "String",
        customerEmail: "String",
        customerPhone: "String",
        url: "String",
        billetLink: 'String',
        downloadLink: 'String',
        qrCode: 'Object',
        barCode: 'String',
        description: 'String',
        value: 'Decimal',
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

billetBillingSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
});

const BilletBilling = mongoose.model('BilletBilling', billetBillingSchema);

module.exports = BilletBilling;

