const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static('public'));

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ksanjay69192@gmail.com',
        pass: 'sxge ewlm mjsk tpvg' // Aapka App Password yahan daalein
    }
});

// Test route to check if server is working
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Contact form submission route
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).send('All fields are required.');
    }

    const mailOptions = {
        from: email,
        to: 'ksanjay69192@gmail.com',
        subject:`New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        replyTo: email
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email: ' + error.message);
        }

        console.log('Email sent: ' + info.response);

        // Client ko thank you email bhejo
        const thankYouMail = {
            from: 'ksanjay69192@gmail.com',
            to: email,
            subject: 'Thank You for Reaching Out!',
            text: `Hi ${name},\n\nThank you for contacting Innovate Designs! We have received your message:\n\n"${message}"\n\nWe will get back to you within 24-48 hours.\n\nBest regards,\nInnovate Designs Team`
        };

        transporter.sendMail(thankYouMail, (err, info) => {
            if (err) {
                console.log('Error sending thank you email:', err);
            } else {
                console.log('Thank you email sent: ' + info.response);
            }
        });

        res.status(200).send('Message sent successfully!');
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('404: File not found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`); // Fixed: Added backticks for template literal
});