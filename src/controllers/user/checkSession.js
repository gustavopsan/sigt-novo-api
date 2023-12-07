const JWT = require('jsonwebtoken');
const userModel = require('../../models/user');

async function checkSession(token) {
    try {
        const decoded = JWT.verify(token, process.env.SECRET);
        const userLogged = await userModel.findById(decoded.id);

        if (!userLogged) {
            return {
                status: 'error',
                errorId: 'session_01',
                message: 'USER_NOT_FOUND'
            }
        }

        return {
            name: userLogged.name,
            email: userLogged.email,
            role: userLogged.role,
            churchId: userLogged.churchId,
            isActive: userLogged.isActive
        }

    } catch (error) {
        return error;
    }
}

module.exports = checkSession;