import nodemailer from 'nodemailer';
import { messageTemplate } from '../../lib/messageTemplate'; // Assuming this is the path to your message template
import moment from 'moment';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, subject, body, firstName, attachments } = req.body; // Extract email data and attachments

    if (!body || !firstName) {
      return res.status(400).json({ success: false, error: 'Missing body or firstName in request' });
    }

    const { SMTP_EMAIL, SMTP_PASSWORD } = process.env;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: SMTP_EMAIL,
        pass: SMTP_PASSWORD,
      },
    });

    try {
      let htmlMessage = messageTemplate.replace('{messagebody}', body);
      htmlMessage = htmlMessage.replace('{firstName}', firstName);

      const currentDate = moment().format('MMMM D, YYYY');
      htmlMessage = htmlMessage.replace('{currentDate}', currentDate);

      const mailOptions = {
        from: SMTP_EMAIL,
        to,
        subject,
        html: htmlMessage,
        attachments: attachments ? attachments.map(({ filename, content, contentType, path }) => ({
          filename,
          content: Buffer.from(content, 'base64'),
          contentType,
          path: path
        })) : [],
      };

      const info = await transporter.sendMail(mailOptions);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, error: 'Error sending email' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb', // Set desired limit here
    },
  },
};