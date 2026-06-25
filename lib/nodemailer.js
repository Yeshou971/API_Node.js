const nodemailer = require("nodemailer")
require('dotenv').config()

// Create a transporter using SMTP
const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_SMTP,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_SMTP, // sender address
            to, // list of recipients
            subject, // subject line
            text, // plain text body
            html: `<b>${text}</b>`, // HTML body
        });

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch (err) {
        console.error("Error while sending mail:", err);
    }
}

module.exports = sendEmail