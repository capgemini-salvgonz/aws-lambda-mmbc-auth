const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: 'mail.2code.com.mx',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * 
 * @param {string} email 
 * @param {string} code 
 */
module.exports.sendMail = async (email, code) => {
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'MFA Code',
    html: `<p>Tu código de autorización es: <strong>${code}</strong></p>`
  };

  transport.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });
}

