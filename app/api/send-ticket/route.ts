import { NextRequest, NextResponse } from 'next/server';
import formidable from 'formidable';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { Readable } from 'stream';
import { IncomingMessage } from 'http';
import { Socket } from 'net';
import fs from 'fs';

export const config = {
    api: {
        bodyParser: false,
    },
};

const parseForm = (req: NextRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable({ multiples: true });

    return new Promise((resolve, reject) => {
        const stream = Readable.from(req.body as any);

        const { PassThrough } = require('stream');
        const passThrough = new PassThrough();

        const mockSocket = new Socket();
        const mockReq = new IncomingMessage(mockSocket);
        mockReq.headers = Object.fromEntries(req.headers.entries());

        stream.pipe(passThrough);
        passThrough.pipe(mockReq);

        form.parse(mockReq, (err: Error | null, fields: formidable.Fields, files: formidable.Files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

const uploadToR2 = async (key: string, body: Buffer | Readable, contentType: string) => {
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

    await s3.send(command);
};

export async function POST(req: NextRequest) {
    try {
        const { fields, files } = await parseForm(req);
        const { subject, priority, description } = {
            subject: fields.subject?.toString() || '',
            priority: fields.priority?.toString() || '',
            description: fields.description?.toString() || '',
        };

        if (!subject || !priority || !description) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Store form content in R2
        const formContentKey = `forms/${Date.now()}-${subject}.json`;
        const formContent = JSON.stringify({ subject, priority, description });
        await uploadToR2(formContentKey, Buffer.from(formContent), 'application/json');

        // Store uploaded files in R2
        const uploadedFiles: string[] = [];
        if (files.screenshot) {
            const screenshots = Array.isArray(files.screenshot) ? files.screenshot : [files.screenshot];
            for (const file of screenshots) {
                const fileKey = `uploads/${Date.now()}-${file.originalFilename}`;
                const fileStream = fs.createReadStream(file.filepath);
                await uploadToR2(fileKey, fileStream, file.mimetype || 'application/octet-stream');
                uploadedFiles.push(fileKey);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Form and files uploaded successfully',
            formContentKey,
            uploadedFiles,
        });
    } catch (error) {
        console.error('Error uploading to R2:', error);
        return NextResponse.json({ error: 'Failed to upload to R2' }, { status: 500 });
    }
}