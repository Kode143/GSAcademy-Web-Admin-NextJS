import Layout from '@/components/Layout';
import { Contact } from '@/models/contact';
import { mongooseConnect } from '@/lib/mongoose';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import MessageReply from '../../components/ContactComponents/MessageReply';
import MessageList from '../../components/ContactComponents/MessageList';

const MessageDetail = ({ messageData, allMessages }) => {
  const router = useRouter();
  const { id } = router.query;
  const [selectedMessageId, setSelectedMessageId] = useState(null); // State for selected message ID

  useEffect(() => {
    setSelectedMessageId(id); // Set selected message ID from URL parameter

    const markMessageAsRead = async () => {
      await axios.put(`/api/contact/${id}`, { read: true }); // Update read status of the message
    };

    markMessageAsRead();
  }, [id]);



  return (
    <Layout>
      <div className='' >
        <Link href={'/message'}>
        <button className='bg-blue-300 p-2 rounded-xl hover:bg-blue-500'>Go Back</button>
        </Link>
      <div className="flex gap-4 ">
        <div className="w-2/6">
        <MessageList allMessages={allMessages} selectedMessageId={selectedMessageId} />
        </div>
        <div className="w-4/6">
        <MessageReply messageData={messageData}  /> 
</div>

        <div className="w-2/6 bg-slate-100 p-2 rounded-lg">
          <p className="font-bold text-lg">Sender Details</p>
         
          <p><span className="font-bold">Email:</span> {messageData.email}</p>
          <p><span className="font-bold">Phone Number:</span> {messageData.phoneNumber}</p>
          <p><span className="font-bold">Address:</span> {messageData.address}</p>
        </div>
      </div>
      </div>
    
    </Layout>
  );
};

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.query;
  const messageData = await Contact.findById(id);
  const allMessages = await Contact.find({}, null, { sort: { '_id': -1 } });

  return {
    props: {
      messageData: JSON.parse(JSON.stringify(messageData)),
      allMessages: JSON.parse(JSON.stringify(allMessages)),
    },
  };
}

export default MessageDetail;
