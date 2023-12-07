const userModel = require('../../models/user');
const tokenModel = require('../../models/token');

const crypto = require('crypto');
const JOI = require('joi');

async function requestPasswordRecovery(email) {
    try {
        const emailSchema = JOI.object({ email: JOI.string().email().required() });
        const { error } = emailSchema.validate({ email: email });

        if (error) {
            return error;
        } else {
            const user = await userModel.findOne({ email: email });

            if (!user) {
                return {
                    message: "User not found with given email"
                }
            } else {
                let token = await tokenModel.findOne({ userId: user._id });

                if (!token) {
                    token = await new tokenModel({
                        userId: user._id,
                        token: crypto.randomBytes(32).toString('hex')
                    }).save();
                }

                return {
                    userId: user._id,
                    userName: user.name,
                    token: token.token
                }
            }
        }

    } catch (error) {
        return {
            message: "An error occurred while trying to recover your password",
            error: error
        }
    }
}

module.exports = requestPasswordRecovery;