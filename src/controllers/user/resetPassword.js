const userModel = require('../../models/user');
const tokenModel = require('../../models/token');

const JOI = require('joi');

async function resetPassword(userId, token, newPassword) {
    try {
        const passwordSchema = JOI.object({ password: JOI.string().required() });
        const { error } = passwordSchema.validate({ password: newPassword });

        if (error) {
            return error;
        } else {
            const user = await userModel.findById({ _id: userId });

            if (!user) {
                return {
                    failed: true,
                    message: "Invalid or expired token"
                }
            } else {
                const userToken = await tokenModel.findOne({
                    userId,
                    token
                });

                if (!userToken) {
                    return {
                        failed: true,
                        message: "Invalid or expired token"
                    }
                } else {
                    await userModel.findOneAndUpdate(
                        { email: user.email },
                        { password: newPassword }
                    )

                    await tokenModel.findOneAndRemove({ token: token });

                    return {
                        message: "Password reset successfully"
                    }
                }
            }
        } 
    } catch (error) {
        return {
            failed: true,
            message: "An error occurred while resetting password",
            error: error
        }
    }
}

module.exports = resetPassword;