import nodemailer from 'nodemailer';
import { messageTemplate } from '../../lib/messageTemplate'; // Assuming this is the path to your message template
import moment from 'moment';
import mongoose from 'mongoose';
import { Contact } from '../../models/contact';

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  return mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { to, subject, body, firstName, lastName, contactId, attachments } = req.body;

    if (!body || !firstName || !contactId) {
      return res.status(400).json({ success: false, error: 'Missing body, firstName, or contactId in request' });
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

      // Find the contact and add the reply
      const contact = await Contact.findById(contactId);
      if (!contact) {
        return res.status(404).json({ success: false, error: 'Contact not found' });
      }

      // Ensure replies array is initialized
      if (!contact.replies) {
        contact.replies = [];
      }

      contact.replies.push({
        subject,
        body,
      });

      await contact.save();

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
