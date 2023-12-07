const userModel = require('../../models/user');

async function updateUserData(id, key, newvalue) {
    try {
        const user = await userModel.findByIdAndUpdate(
            { _id: id },
            { [key]: newvalue },
            { new: false }
        )

        if (user) {
            const userUpdated = await userModel.findById(
                { _id: id }
            );

            return userUpdated;
        }
    } catch (error) {
        return error;
    }
}

module.exports = updateUserData;