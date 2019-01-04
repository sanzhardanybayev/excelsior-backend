const nodemailer    = require('nodemailer')

const sendEmail = (reciever, subject, text, textHTML) => {

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'mapsofneeds@gmail.com', // generated ethereal user
      pass: '@MapsOfNeeds123'// generated ethereal password
    }
  })

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"Robot 🤖👻" <mapsofneeds@gmail.com>', // sender address
    to: reciever, // list of receivers
    subject: subject,// Subject line
    text: text,// plain text body
    html: textHTML // html body
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return  false
    }
    console.log('Message sent: %s', info.messageId)
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
    return true
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  })
}

module.exports = sendEmail

