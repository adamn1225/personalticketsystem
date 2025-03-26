import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';

type TicketFields = {
    subject: string;
    priority: string;
    description: string;
};

export const config = {
    api: {
        bodyParser: false,
    },
};



const parseForm = (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable({ multiples: true }); // Allow multiple files if needed

    return new Promise((resolve, reject) => {
        // Convert the NextRequest body to a readable stream
        const stream = Readable.from(req.body as any);

        // Create a mock Node.js IncomingMessage object
        const { IncomingMessage } = require('http');
        const mockReq = new IncomingMessage(stream);
        mockReq.headers = req.headers; // Pass headers from NextRequest

        form.parse(mockReq, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

const fileToBuffer = async (file: formidable.File): Promise<Buffer> => {
    return fs.promises.readFile(file.filepath);
};

export async function POST(req: NextRequest) {
    try {
        // Parse the form data
        const { fields, files } = await parseForm(req);
        const { subject, priority, description } = {
            subject: fields.subject?.toString() || '',
            priority: fields.priority?.toString() || '',
            description: fields.description?.toString() || '',
        } as TicketFields;

        if (!subject || !priority || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender email address
            to: 'noah@ntslogistics.com', // Recipient email address
            subject: subject, // Use the subject from the request body
            text: JSON.stringify({ subject, priority, description }, null, 2), // Format the email content as JSON
        };

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Ticket error:', error);
        return NextResponse.json({ error: 'Failed to send ticket' }, { status: 500 });
    }
}