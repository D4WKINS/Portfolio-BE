import express from "express"

import nodemailer from "nodemailer"

const emailRouter = express.Router()

emailRouter.post("/", async (req, res, next) => {
    const data = req.body

    //What the receiver is going to receive when they get the email
    const output = `
    <p>You have a new message!</p>
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name} </li>
        <li>Email: ${req.body.email} </li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    
    `
    // Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false,
        auth: {
            type: "OAUTH2",
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            refreshToken: process.env.GOOGLE_CLIENT_REFRESH_TOKEN
        }
    })

    let mail = {
        from: '"Nodemailer Contact" <foo@example.com>', // sender address
        to: "carlanthony782@gmail.com, carldawkins6@gmail.com", // Subject line
        subject: "New message",
        // text: "Hello world?", // plain text body
        html: output // html body}
    }
    // send mail with defined transport object
    let info = await transporter.sendMail(mail)

    if (info) {
        console.log("Message sent: %s", info.messageId)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

        res.status(200).send({ message: "Email has been sent!" })
    } else {
        throw new error(err)
    }
})

export default emailRouter
