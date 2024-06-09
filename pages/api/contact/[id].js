// pages/api/messages/[id].js
import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/contact';

export default async function handle(req, res) {
  const { method, query: { id } } = req;

  await mongooseConnect();

  if (method === 'PUT') { // Handle PUT method for updating read status
    try {
      const { read } = req.body; // Assuming req.body contains the updated read status
      const updatedContact = await Contact.findByIdAndUpdate(
        id,
        { $set: { read } }, // Update the read status
        { new: true } // Return the updated document
      );
      if (updatedContact) {
        return res.status(200).json(updatedContact);
      } else {
        return res.status(404).json({ error: 'Contact not found' });
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      return res.status(500).json({ error: 'Error updating contact' });
    }
  }

  res.status(405).end(); // Method Not Allowed
}
