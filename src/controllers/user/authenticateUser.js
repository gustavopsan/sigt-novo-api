const userModel = require('../../models/user');

async function authenticateUser(email, password) {
    try {
        const userLogged = await userModel.findOne({ email: email });

        if (!userLogged) {
            return {
                status: 'error',
                errorId: 'auth_01',
                message: 'USER_NOT_FOUND'
            }
        } else if (userLogged.password !== password) {
            return {
                status: 'error',
                errorId: 'auth_02',
                message: 'PASSWORD_MISMATCH'
            }
        } else if (!userLogged.isActive) {
            return {
                status: 'error',
                errorId: 'auth_03',
                message: 'USER_NOT_ACTIVE'
            }
        } else {
            return {
                userId: userLogged._id,
                name: userLogged.name,
                email: userLogged.email,
                role: userLogged.role,
                churchId: userLogged.churchId
            }
        }
    } catch (error) {
        return error;
    }
}

module.exports = authenticateUser;