import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';
import { Socket } from 'net';

export const config = {
    api: {
        bodyParser: false,
    },
};

type TicketFields = {
    subject: string;
    priority: string;
    description: string;
};

const parseForm = (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable({ multiples: true });

    return new Promise((resolve, reject) => {
        const stream = Readable.from(req.body as any);

        // Create a writable stream to handle piping
        const { PassThrough } = require('stream');
        const passThrough = new PassThrough();

        // Create a mock socket to satisfy TypeScript's IncomingMessage constructor
        const mockSocket = new Socket();
        const mockReq = new IncomingMessage(mockSocket);
        mockReq.headers = Object.fromEntries(req.headers.entries());

        // Pipe the body into the writable stream and then into the mock request
        stream.pipe(passThrough);
        passThrough.pipe(mockReq);

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
        const { fields, files } = await parseForm(req);
        const { subject, priority, description } = {
            subject: fields.subject?.toString() || '',
            priority: fields.priority?.toString() || '',
            description: fields.description?.toString() || '',
        } as TicketFields;

        if (!subject || !priority || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const attachments: any[] = [];
        if (files.screenshot) {
            const uploaded = Array.isArray(files.screenshot) ? files.screenshot : [files.screenshot];
            for (const file of uploaded) {
                const content = await fileToBuffer(file);
                attachments.push({
                    filename: file.originalFilename || 'attachment',
                    content,
                    contentType: file.mimetype || 'application/octet-stream',
                });
            }
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'noah@ntslogistics.com',
            subject: `Support Ticket [${priority.toUpperCase()}] - ${subject}`,
            text: description,
            html: `<p><strong>Priority:</strong> ${priority}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>`,
            attachments,
        };

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Ticket error:', error);
        return NextResponse.json({ error: 'Failed to send ticket' }, { status: 500 });
    }
}
