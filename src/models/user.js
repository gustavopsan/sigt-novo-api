const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name: "String",
        email: {
            type: "String",
            unique: true
        },
        password: "String",
        role: "String",
        churchId: "String",
        isActive: "Boolean"
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;