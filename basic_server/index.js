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


app.get('/sendpdf', (req, res) => {

    // /etc/apparmor.d/abstractions/ubuntu-browsers.d/chromium-browser

    // /usr/share/bash-completion/completions/google-chrome
    // /snap/core20/2015/usr/share/bash-completion/completions/google-chrome
    // Function to generate a PDF using Puppeteer
    async function generatePDF() {

        // Launch headless Chrome with the new Headless mode
        /*   const browser = await puppeteer.launch({
              executablePath: '/etc/apparmor.d/abstractions/ubuntu-browsers.d/chromium-browser',
              headless: true, // 'new',
              dumpio: true, // Enable debugging output
              args: ['--no-sandbox'],
  
          }); */
        const browser = await puppeteer.launch({
            executablePath: '/etc/apparmor.d/abstractions/ubuntu-browsers.d/chromium-browser',
            headless: true, // or headless: 'new'
            dumpio: true,
            args: ['--no-sandbox'],
        });
        const page = await browser.newPage();
        await page.goto('https://google.com');
        const pdfBuffer = await page.pdf();
        await browser.close();
        return pdfBuffer;

        /*   const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('https://google.com');
          const pdfBuffer = await page.pdf();
          await browser.close();
          return pdfBuffer; */
    }

    // Function to send email with PDF attachment using Nodemailer
    async function sendEmail(pdfBuffer) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.zoho.com',
            port: 465,
            secure: true, // Use SSL
            auth: {
                user: 'info@symbolicteam.com',
                pass: 'A7tM183XM1si',
            },
        });
        const senderName = 'Symbolic Team'; // Replace with the actual sender's name
        const senderEmail = 'info@symbolicteam.com';

        const mailOptions = {
            from: `${senderName} <${senderEmail}>`,
            to: 'syedhasib01@gmail.com',
            subject: 'Test Email',
            text: 'Hello, this is a test email from Node.js using Zoho Mail!',
            attachments: [
                {
                    filename: 'example.pdf',
                    content: pdfBuffer,
                    encoding: 'base64',
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
    }

    // Main function to orchestrate the process
    async function main() {
        try {
            // Generate PDF
            const pdfBuffer = await generatePDF();

            // Send email with PDF attachment
            await sendEmail(pdfBuffer);

            console.log('Process completed successfully.');
            res.send('Hello World from send with pdf!')
        } catch (error) {
            console.error('Error:', error);
            res.send('fail to send pdf!')
        }
    }

    // Run the main function
    main();

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