const nodemailer = require("nodemailer");

const configureMailer = (email, password) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password
    }
  })

  const sendVerificationEmail = async (emailApps, baseUrl, email, token) => {
    try {
      const verificationUrl = `${baseUrl}/verify-email/${token}`;
      await transporter.sendMail({
        from: emailApps,
        to: email,
        subject: "Verify Your Email",
        html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`,
      });
      
    } catch (error) {
      console.log(error);
      throw new Error('error while trying to sent verification email')
    }
  };

  return sendVerificationEmail;
}

module.exports = configureMailer;
