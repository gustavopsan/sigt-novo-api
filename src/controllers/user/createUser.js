const userModel = require('../../models/user');

async function createUser(name, email, password, role, churchId) {
    try {
        const userCreated = await userModel.create(
            {
                name,
                email,
                password,
                role,
                churchId,
                isActive: true
            }
        );

        return userCreated;
    } catch (error) {
        return error;
    }
}

module.exports = createUser;