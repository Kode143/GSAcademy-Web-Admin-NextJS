// pages/message/index.js
import Layout from '@/components/Layout';
import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/contact';

import DeleteContacts from '@/components/DeleteModals/DeleteContacts'; // Update import path as per your project structure
import { useState } from 'react';
import MessageCard from '../../components/ContactComponents/MessageCard';
import ComposeForm from '../../components/AddForms/ComposeForm';
import { MessageInbox } from '../../components/Icons';

const Messages = ({ contacts }) => {
  const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message ID

  const handleSelectMessage = (messageId) => {
    setSelectedMessageId(messageId);
  };
  const unreadCount = contacts.filter((msg) => !msg.read).length;
  return (
    <Layout>
      <div className="flex flex-col bg-white shadow-md rounded px-8 pt-6">
        <div className='flex justify-between mb-2'> 
        <div className='flex gap-3'>
        <p className="font-bold text-lg">Incoming Messages</p>
        <div className="relative">
          <MessageInbox className='w-6 h-6' />
          {unreadCount > 0 && (
            <span className="absolute  right-0 left-5 bottom-9 bg-green-500 text-white rounded-full w-4 h-4 flex justify-center items-center text-xs">
              {unreadCount}
            </span>
          )}
        </div>
        </div>
       
        <div className=''>
          <ComposeForm />
        </div>
        </div>
       
        <div className='grid grid-cols-4 gap-4 overflow-scroll'  style={{ height: '510px' }}>
          {contacts.map((contact) => (
            <div key={contact._id}>
              <MessageCard
                contact={contact}
                selectedMessageId={selectedMessageId}
                handleSelectMessage={handleSelectMessage}
              />
              <DeleteContacts contactId={contact._id} firstName={contact.firstName} lastName={contact.lastName} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  await mongooseConnect();
  const contacts = await Contact.find({}, null, { sort: { '_id': -1 } });

  return {
    props: {
      contacts: JSON.parse(JSON.stringify(contacts)),
    },
  };
}

export default Messages;
