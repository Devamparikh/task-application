const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'devam.parikh@marutitech.com',
        subject: 'this is my first creation',
        text: `this is my first creation indeed ${name}`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'devam.parikh@marutitech.com',
        subject: 'this is my first creation',
        text: `why removed your account?? ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}