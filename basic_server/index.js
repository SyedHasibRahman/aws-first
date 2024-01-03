const express = require('express')
const nodemailer = require('nodemailer');
const puppeteer = require('puppeteer');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World from aws & port removed by nginx  work correctly 1!')
})

// Function to generate a PDF using Puppeteer
async function generatePDF() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://google.com');
    const pdfBuffer = await page.pdf();
    await browser.close();
    return pdfBuffer;
}


app.get('/sendpdf', async (req, res) => {
    const senderName = 'Symbolic Team'; // Replace with the actual sender's name
    const senderEmail = 'info@symbolicteam.com';

    async function generateAndSendPDF() {
        // Launch a headless browser
        // const browser = await puppeteer.launch();
        const browser = await puppeteer.launch({ headless: "new" });

        // Create a new page
        const page = await browser.newPage();

        // Navigate to a web page (you can change the URL)
        await page.goto('https://google.com');

        // Generate a PDF from the page
        const pdfBuffer = await page.pdf({ format: 'A4' });

        // Close the browser
        await browser.close();

        // Send the PDF as an email attachment
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: 'info@symbolicteam.com',
                pass: 'A7tM183XM1si',
            },
        });

        const mailOptions = {
            from: `${senderName} <${senderEmail}>`,
            to: 'syedhasib01@gmail.com',
            subject: 'Test Email',
            text: 'Hello, this is a test email from Node.js using Zoho Mail!',
            // text: 'Please find the PDF attached.',
            attachments: [
                {
                    filename: 'output.pdf',
                    content: pdfBuffer,
                    encoding: 'base64', // use base64 encoding for binary data
                },
            ],
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.error('Error sending email:', error);

            }
            console.log('Email sent:', info.response);
            return console.error('Email sent:', info.response);
            // res.send('Email sent:', info.response);
        });
    }

    // Call the function to generate and send the PDF
    const response = await generateAndSendPDF();
    res.send({ 'Email sent:': response });

})
app.get('/send', (req, res) => {
    const senderName = 'Symbolic Team'; // Replace with the actual sender's name
    const senderEmail = 'info@symbolicteam.com';
    // Create a transporter using your Zoho Mail SMTP settings
    const transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, // Use SSL
        auth: {
            user: 'info@symbolicteam.com',
            pass: 'A7tM183XM1si',
        },
    });
    // Define the email options
    const mailOptions = {
        from: `${senderName} <${senderEmail}>`,
        to: 'syedhasib01@gmail.com',
        subject: 'Test Email',
        text: 'Hello, this is a test email from Node.js using Zoho Mail!',
    };
    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });

    res.send('Hello World from send!')
})

app.listen(port, () => {
    console.log(`Example app listening 1 on port ${port}!`)
})