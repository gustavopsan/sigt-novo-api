const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
    {
        name: "String",
        churchId: "String",
        subscriptionType: "String",
        subscriptionValue: "Decimal",
        subscriptionPaymentId: "String",
        subscriptionPaymentType: "String",
        subscriptionPaymentStatus: "Boolean"
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
 
subscriptionSchema.set('toJSON', {
    transform: (doc, ret) => {
       decimal2JSON(ret);
       return ret;
    }
})

const Subscription = mongoose.model("Subscription", subscriptionSchema);

module.exports = Subscription;