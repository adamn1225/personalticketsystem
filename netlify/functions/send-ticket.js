const nodemailer = require("nodemailer");
const formidable = require("formidable");
const fs = require("fs");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: "Method Not Allowed" }),
        };
    }

    try {
        // Parse the multipart form data
        const form = new formidable.IncomingForm({ multiples: true });
        const parsedData = await new Promise((resolve, reject) => {
            form.parse(event, (err, fields, files) => {
                if (err) reject(err);
                else resolve({ fields, files });
            });
        });

        const { subject, priority, description } = parsedData.fields;
        const { screenshot } = parsedData.files;

        if (!subject || !priority || !description) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: "Missing required fields" }),
            };
        }

        // Read the uploaded file (if any)
        let attachments = [];
        if (screenshot) {
            const screenshots = Array.isArray(screenshot) ? screenshot : [screenshot];
            attachments = screenshots.map((file) => ({
                filename: file.originalFilename,
                content: fs.readFileSync(file.filepath),
                contentType: file.mimetype,
            }));
        }

        // Configure nodemailer
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: "noah@ntslogistics.com", // Replace with your recipient email
            subject: `Support Ticket [${priority.toUpperCase()}] - ${subject}`,
            text: description,
            attachments, // Attach the uploaded files
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return {
            statusCode: 200,
            body: JSON.stringify({ success: true }),
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send ticket" }),
        };
    }
};