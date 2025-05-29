import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const payment = await request.json();

    // TODO: Add authentication check here
    // TODO: Add database integration

    // Check for required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
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

    // Send status update email to donor
    try {
      // Send email to donor
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: payment.email,
        subject: `Donation Status Update - IKSHANA`,
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
              .status { text-align: center; padding: 10px; margin: 20px 0; font-size: 18px; font-weight: bold; border-radius: 6px; }
              .status.verified { background: #dcfce7; color: #166534; }
              .status.rejected { background: #fee2e2; color: #991b1b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Donation Status Update</h1>
              </div>
              <div class="content">
                <div class="status ${payment.status === 'verified' ? 'verified' : 'rejected'}">
                  ${payment.status === 'verified' ? 'Your donation has been verified!' : 'Your donation could not be verified'}
                </div>
                <div class="amount">₹${payment.amount}</div>
                <div class="donation-card">
                  <div class="detail-row">
                    <span class="label">Reference Number </span>
                    <span class="value">${payment.referenceNumber}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Payment Method </span>
                    <span class="value">${payment.paymentMethod}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Verified By </span>
                    <span class="value">${payment.verifiedBy}</span>
                  </div>
                  ${payment.notes ? `
                  <div class="detail-row">
                    <span class="label">Notes </span>
                    <span class="value">${payment.notes}</span>
                  </div>
                  ` : ''}
                </div>
                ${payment.status === 'verified' ? 
                  '<p style="text-align: center; color: #166534;">Thank you for your generous contribution!</p>' : 
                  `<p style="text-align: center; color: #991b1b;">If you believe this is an error, please contact us with your reference number.</p>`
                }
              </div>
              <div class="footer">
                <p>IKSHANA - Making a difference together</p>
              </div>
            </div>
          </body>
          </html>
        `,
      });

      // Send email to admin
      if (!process.env.ADMIN_EMAIL) {
        console.error('Missing ADMIN_EMAIL environment variable');
        return NextResponse.json({ error: 'Email service configuration error' }, { status: 500 });
      }

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `Payment ${payment.status === 'verified' ? 'Verified' : 'Rejected'} - IKSHANA`,
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
              .status { text-align: center; padding: 10px; margin: 20px 0; font-size: 18px; font-weight: bold; border-radius: 6px; }
              .status.verified { background: #dcfce7; color: #166534; }
              .status.rejected { background: #fee2e2; color: #991b1b; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Payment ${payment.status === 'verified' ? 'Verified' : 'Rejected'}</h1>
              </div>
              <div class="content">
                <div class="status ${payment.status === 'verified' ? 'verified' : 'rejected'}">
                  ${payment.status === 'verified' ? 'Payment has been verified' : 'Payment has been rejected'}
                </div>
                <div class="amount">₹${payment.amount}</div>
                <div class="donation-card">
                  <div class="detail-row">
                    <span class="label">Reference Number </span>
                    <span class="value">${payment.referenceNumber}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Payment Method </span>
                    <span class="value">${payment.paymentMethod}</span>
                  </div>
                  <div class="detail-row">
                    <span class="label">Verified By </span>
                    <span class="value">${payment.verifiedBy}</span>
                  </div>
                  ${payment.notes ? `
                  <div class="detail-row">
                    <span class="label">Notes </span>
                    <span class="value">${payment.notes}</span>
                  </div>
                  ` : ''}
                </div>
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
    console.error('Error processing payment update:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    // TODO: Add authentication check here
    // TODO: Add database integration to fetch payments
    // For now, return empty array
    
    return NextResponse.json({ payments: [] });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}