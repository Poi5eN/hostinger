const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'karan07200119@gmail.com',
      pass: 'wzzthlkezgnfniif'
    },
  });
  
  // Create a function to send an email
  const sendEmail = (toEmail, subject, htmlContent) => {
    const mailOptions = {
      from: 'karan07200119@gmail.com',
      to: toEmail,
      subject: subject,
      html: htmlContent,
    };
  
    return transporter.sendMail(mailOptions);
  };

module.exports = sendEmail