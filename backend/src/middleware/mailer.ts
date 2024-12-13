import { Injectable } from "@nestjs/common";
import nodemailer from 'nodemailer'
import config from 'config'
import Mail, { Address } from "nodemailer/lib/mailer";

@Injectable()
export class MailerService {
    private transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Gmail SMTP server
            port: 587, // SMTP port for TLS
            secure: false, // Set to true for port 465 (SSL), false for 587 (TLS)
            auth: {
                user: config.get('nodemailer.email'), // Your Gmail address
                pass: config.get('nodemailer.pass'), // Your Gmail App Password
            },
        });
    }

    async sendMail(data: { from?: Address, to: Address[], subject: string, text?: string, html: string, placeholderReplacements?: Record<string, string> }) {
        const { from, to, subject, text, html, placeholderReplacements } = data

        const mailOptions: Mail.Options = {
            from: from ?? {
                name: config.get('nodemailer.email'),
                address: config.get('nodemailer.email')
            }, // Sender address
            to: to.map((recipient) => recipient.address), // Recipient address
            subject, // Subject line
            html, // HTML body (optional)
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}