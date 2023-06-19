import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export function sendMail(to: string, subject: string, text: string) {
  transporter.sendMail(
    {
      from: process.env.MAIL_FROM,
      to,
      subject,
      text,
    },
    (error, info) => {
      if (error) {
        console.log(error)
      } else {
        console.log('Email sent: ' + info.response)
      }
    }
  )
}
