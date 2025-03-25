import nodemailer from "nodemailer";
import 'dotenv/config'

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

// export const sendEmail = (to,subject,text)=>{
//     const send = transporter.sendMail({
//         from: process.env.USER_EMAIL,
//         to:to,
//         subject:subject,
//         text:text
// })
//     console.log('email sent', send)
// }

//using HTML
export const sendEmail = async (to,subject,html)=>{
    const send = await transporter.sendMail({
        from: process.env.USER_EMAIL,
        to:to,
        subject:subject,
        html:`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 8px; text-align: center;">
            <h2 style="color: #4CAF50;">Welcome to Our Service, New User!</h2>
            <p style="font-size: 16px; color: #555;">
                We're thrilled to have you with us. Get ready to explore all the amazing features we have to offer. If you have any questions, feel free to reach out!
            </p>
                style="display: inline-block; background-color: #4CAF50; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; font-weight: bold;">
                Get Started
            </a>
            <p style="margin-top: 20px; font-size: 14px; color: #888;">Thank you for joining us!<br> - The Team</p>
        </div>`
})
    console.log('email sent', send)
}