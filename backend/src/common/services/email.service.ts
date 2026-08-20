import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
    });
  }

  async sendTaskCreatedEmail(to: string, taskTitle: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('EMAIL_FROM'),
        to,
        subject: `Task Created: ${taskTitle}`,
        html: `<h3>Task Confirmation</h3><p>Your task "<strong>${taskTitle}</strong>" has been created successfully.</p>`,
      });
    } catch (err) {
      console.error('Failed to send task creation email:', err.message);
    }
  }

  async sendTaskCompletedEmail(to: string, taskTitle: string) {
    try {
      await this.transporter.sendMail({
        from: this.configService.get('EMAIL_FROM'),
        to,
        subject: `Task Completed: ${taskTitle}`,
        html: `<h3>Task Completed!</h3><p>Great job! Task "<strong>${taskTitle}</strong>" has been marked as DONE.</p>`,
      });
    } catch (err) {
      console.error('Failed to send task completion email:', err.message);
    }
  }
}