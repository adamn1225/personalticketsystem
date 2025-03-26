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

        let attachment = null;
        if (files?.screenshot && files.screenshot[0]) {
            const file = files.screenshot[0];
            const fileBuffer = await fileToBuffer(file);
            attachment = {
                filename: file.originalFilename,
                content: fileBuffer,
                contentType: file.mimetype,
            };
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions: any = {
            from: process.env.EMAIL_USER,
            to: process.env.SUPPORT_DEST_EMAIL || process.env.EMAIL_USER,
            subject: `Support Ticket [${priority.toUpperCase()}] - ${subject}`,
            text: description,
            html: `<p><strong>Priority:</strong> ${priority}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>`
        };

        if (attachment) {
            mailOptions.attachments = [attachment];
        }

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Ticket error:', error);
        return NextResponse.json({ error: 'Failed to send ticket' }, { status: 500 });
    }
}