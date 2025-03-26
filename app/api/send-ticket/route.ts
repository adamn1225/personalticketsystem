import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Busboy from 'busboy';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

export const config = {
    api: {
        bodyParser: false,
    },
};

// Upload a file to Cloudflare R2
const uploadToR2 = async (key: string, body: Buffer | Readable, contentType: string) => {
    console.log('Uploading to bucket:', process.env.CLOUDFLARE_R2_BUCKET);
    console.log('Endpoint:', process.env.CLOUDFLARE_R2_ENDPOINT);

    const s3 = new S3Client({
        region: process.env.CLOUDFLARE_R2_REGION,
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
        },
    });

    const command = new PutObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: key,
        Body: body,
        ContentType: contentType,
    });

    try {
        await s3.send(command);
        console.log('File uploaded successfully:', key);
    } catch (error) {
        console.error('Error uploading to R2:', error);
        throw error;
    }
};

// Generate a signed URL for accessing a file
const generateSignedUrl = async (key: string) => {
    const s3 = new S3Client({
        region: process.env.CLOUDFLARE_R2_REGION,
        endpoint: process.env.CLOUDFLARE_R2_ENDPOINT,
        credentials: {
            accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY!,
            secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_KEY!,
        },
    });

    const command = new GetObjectCommand({
        Bucket: process.env.CLOUDFLARE_R2_BUCKET,
        Key: key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // URL valid for 1 hour
    return signedUrl;
};

// Parse form data using Busboy
const parseForm = (req: NextRequest): Promise<{ fields: Record<string, string>; files: Array<{ filename: string; mimetype: string; buffer: Buffer }> }> => {
    return new Promise((resolve, reject) => {
        const fields: Record<string, string> = {};
        const files: Array<{ filename: string; mimetype: string; buffer: Buffer }> = [];
        const busboy = Busboy({ headers: Object.fromEntries(req.headers.entries()) });

        busboy.on('field', (fieldname: string, value: string) => {
            fields[fieldname] = value;
        });

        busboy.on('file', (fieldname: string, file: NodeJS.ReadableStream, filename: string, encoding: string, mimetype: string) => {
            const buffers: Buffer[] = [];
            file.on('data', (data: Buffer) => buffers.push(data));
            file.on('end', () => {
                files.push({ filename, mimetype, buffer: Buffer.concat(buffers) });
            });
        });

        busboy.on('finish', () => resolve({ fields, files }));
        busboy.on('error', (err) => reject(err));

        const readable = Readable.from(req.body as any);
        readable.pipe(busboy);
    });
};

// Handle POST request
export async function POST(req: NextRequest) {
    try {
        const { fields, files } = await parseForm(req);
        const { subject, priority, description } = fields;

        if (!subject || !priority || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Store form content in R2
        const formContentKey = `forms/${Date.now()}-${subject}.json`;
        const formContent = JSON.stringify({ subject, priority, description });
        await uploadToR2(formContentKey, Buffer.from(formContent), 'application/json');

        // Store uploaded files in R2 and generate signed URLs
        const uploadedFiles: string[] = [];
        for (const file of files) {
            const fileKey = `uploads/${Date.now()}-${file.filename}`;
            console.log('Uploading file with key:', fileKey); // Debugging log
            await uploadToR2(fileKey, file.buffer, file.mimetype);

            // Generate signed URL
            const signedUrl = await generateSignedUrl(fileKey);
            uploadedFiles.push(signedUrl);
        }

        // Send email with nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'noah@ntslogistics.com', // Replace with your recipient email
            subject: `Support Ticket [${priority.toUpperCase()}] - ${subject}`,
            html: `
                <p><strong>Priority:</strong> ${priority}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>
                <p><strong>Uploaded Files:</strong></p>
                <ul>
                    ${uploadedFiles.map((file) => `<li><a href="${file}" target="_blank">${file}</a></li>`).join('')}
                </ul>
            `,
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({
            success: true,
            message: 'Form and files uploaded successfully, and email sent',
            formContentKey,
            uploadedFiles,
        });
    } catch (error) {
        console.error('Error uploading to R2 or sending email:', error);
        return NextResponse.json({ error: 'Failed to upload to R2 or send email' }, { status: 500 });
    }
}