import { Transporter, SendMailOptions, SentMessageInfo } from 'nodemailer';

declare module 'mailer' {
    export interface Mailer {
        transporter: Transporter;
        sendMail(options: SendMailOptions): Promise<SentMessageInfo>;
    }

    export function createMailer(transportOptions: any): Mailer;
}