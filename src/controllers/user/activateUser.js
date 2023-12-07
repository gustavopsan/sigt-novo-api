const userModel = require('../../models/user');

async function activateUser(id) {
    try {
        const user = await userModel.findByIdAndUpdate(
            { _id: id },
            { isActive: true },
            { new: false }
        )

        if (user) {
            const userInactive = await userModel.findById(
                { _id: id }
            );

            return userInactive;
        }
    } catch (error) {
        return error;
    }
}

module.exports = activateUser;