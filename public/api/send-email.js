const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL,
      subject: New Message from ${name},
      text: Name: ${name}\nEmail: ${email}\nMessage: ${message},
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error sending email' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
};