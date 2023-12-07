const userModel = require('../../models/user');

async function getUser(id) {
    const user = await userModel.findById(id);

    if (!user) {
        return {
            message: 'User not found',
        }
    } else {
        return {
            name: user.name,
            email: user.email,
            role: user.role,
            churchId: user.churchId,
            isActive: user.isActive
        }
    }
}

module.exports = getUser;