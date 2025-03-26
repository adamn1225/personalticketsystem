// app/api/send-ticket/route.ts
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import { Readable } from 'stream';
import { Buffer } from 'buffer';

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

const parseForm = (req: any): Promise<{ fields: any; files: any }> => {
    const form = formidable({ multiples: false });
    return new Promise((resolve, reject) => {
        form.parse(req, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

export async function POST(req: NextRequest) {
    try {
        const nodeReq = (req as any).req; // access the raw Node.js request
        const { fields, files }: { fields: TicketFields; files: formidable.Files } = await parseForm(nodeReq);

        const { subject, priority, description } = fields;
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

async function fileToBuffer(file: any): Promise<Buffer> {
    const stream = Readable.from(file.file);
    const chunks: Buffer[] = [];
    for await (const chunk of stream) {
        chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
    return Buffer.concat(chunks);
}