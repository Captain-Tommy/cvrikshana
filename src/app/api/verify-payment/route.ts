import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import nodemailer from 'nodemailer';

import { mkdir } from 'fs/promises';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const screenshot = formData.get('screenshot') as unknown as File;
    const referenceNumber = formData.get('referenceNumber') as string;
    const amount = formData.get('amount') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const paymentMethod = formData.get('paymentMethod') as string;
    const name = formData.get('name') as string;

    if (!screenshot || !referenceNumber || !amount || !email || !phone || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure uploads directory exists
    const uploadsDir = join('public', 'uploads');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      console.error('Error creating uploads directory:', err);
    }

    // Save screenshot
    const bytes = await screenshot.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const screenshotPath = join('public', 'uploads', `${referenceNumber}-${screenshot.name}`);
    await writeFile(screenshotPath, buffer);

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      console.error('Missing required environment variables for email configuration');
      return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to admin and donor
    try {

      
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: '🎉 New Donation Received - IKSHANA',
        attachments: [
          {
            filename: screenshot.name,
            path: screenshotPath
          }
        ],
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .donation-card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0; }
              .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .detail-row:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #64748b; }
              .value { color: #0f172a; }
              .amount { font-size: 24px; color: #2563eb; font-weight: bold; text-align: center; padding: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🎉 New Donation Received</h1>
              </div>
              <div class="content">
                <p style="text-align: center; font-size: 18px; color: #374151;">From: <strong>${name}</strong></p>
                <div class="amount">₹${amount}</div>
                <div class="donation-card">
                  <div class="detail-row">
                    <span class="label">Reference Number </span>
                    <span class="value">${referenceNumber}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Payment Method </span>
                    <span class="value">${paymentMethod}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Donor Email </span>
                    <span class="value">${email}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Donor Phone </span>
                    <span class="value">${phone}</span>
                  </div>
                </div>
                <p style="text-align: center; color: #64748b;">Payment proof has been attached to this email.</p>
              </div>
              <div class="footer">
                <p>IKSHANA - Making a difference together</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // Send confirmation email to donor
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank You for Your Donation - IKSHANA',
        attachments: [
          {
            filename: screenshot.name,
            path: screenshotPath
          }
        ],
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
              .header h1 { color: white; margin: 0; font-size: 28px; }
              .content { background: #ffffff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
              .donation-card { background: #f8fafc; border-radius: 8px; padding: 20px; margin: 20px 0; border: 1px solid #e2e8f0; }
              .detail-row { display: flex; justify-content: space-between; margin: 10px 0; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
              .detail-row:last-child { border-bottom: none; }
              .label { font-weight: bold; color: #64748b; }
              .value { color: #0f172a; }
              .amount { font-size: 24px; color: #2563eb; font-weight: bold; text-align: center; padding: 20px 0; }
              .footer { text-align: center; margin-top: 20px; color: #64748b; font-size: 14px; }
              .message { text-align: center; padding: 20px; color: #4b5563; font-size: 16px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your Donation</h1>
              </div>
              <div class="content">
                <div class="message">
                  <p style="font-size: 18px; color: #374151;">Dear <strong>${name}</strong>,</p>
                  <p>Your donation has been submitted and will be verified by our team shortly.</p>
                  <p>We will update you once the verification is complete.</p>
                </div>
                <div class="amount">₹${amount}</div>
                <div class="donation-card">
                  <div class="detail-row">
                    <span class="label">Reference Number </span>
                    <span class="value">${referenceNumber}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Payment Method </span>
                    <span class="value">${paymentMethod}</span>
                  </div>
                </div>
                <p style="text-align: center; color: #64748b;">Please keep this reference number for future communication.</p>
              </div>
              <div class="footer">
                <p>IKSHANA - Making a difference together</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return NextResponse.json({ error: 'Failed to send email notification' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing payment verification:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}