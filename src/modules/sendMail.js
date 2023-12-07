const nodemailer = require('nodemailer');

const sendMail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.GMAIL_HOST,
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_ACCOUNT,
                pass: process.env.GMAIL_APP_PASSWORD
            }

        });

        await transporter.sendMail({
            from: `'Transparência PIB' ${process.env.GMAIL_ACCOUNT}`,
            to: email,
            subject: subject,
            text: text,
            html: html
        });

        return {
            status: 'success',
            message: 'Message sent successfully'
        }
    } catch (error) {
        return {
            status: 'error',
            message: 'Email cannot be sent',
            error: error
        }
    }
}

module.exports = sendMail;