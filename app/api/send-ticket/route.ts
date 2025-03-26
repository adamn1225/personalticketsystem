// app/api/send-ticket/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
    try {
        const { subject, priority, description } = await req.json();

        if (!subject || !priority || !description) {
            return NextResponse.json({ error: "Missing fields" }, { status: 400 });
        }

        // Configure the transporter
        const transporter = nodemailer.createTransport({
            service: "gmail", // or your preferred SMTP service
            auth: {
                user: process.env.EMAIL_USER, // set in .env.local
                pass: process.env.EMAIL_PASS, // set in .env.local
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.SUPPORT_DEST_EMAIL || process.env.EMAIL_USER, // fallback to self
            subject: `Support Ticket [${priority.toUpperCase()}] - ${subject}`,
            text: description,
            html: `<p><strong>Priority:</strong> ${priority}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Description:</strong><br/>${description.replace(/\n/g, '<br/>')}</p>`
        };

        await transporter.sendMail(mailOptions);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email sending failed:", error);
        return NextResponse.json({ error: "Failed to send ticket" }, { status: 500 });
    }
}
