require("dotenv").config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,

    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

async function sendMail(to, sub, msg) {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: sub,
            html: msg,
        });

        console.log("Email sent:", info.messageId);
    } catch (error) {
        console.error("Email failed:", error);
    }
}

module.exports = sendMail;

