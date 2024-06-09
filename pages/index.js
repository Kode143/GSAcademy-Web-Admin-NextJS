
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/contact';

export default function Home({contactFormData}) {
  const{data: session} = useSession();

  const capitalizeWords = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };


  return <Layout>

  <div className="flex flex-col ">
  <div className="flex justify-between">
  <h1>
  Welcome,<b>{session?.user?.name ? capitalizeWords(session.user.name) : ''}</b>
  </h1>
  <div className="bg-gray-700 flex text-white gap-1 rounded-lg overflow-hidden">
    <img src={session?.user?.image} alt="/" className="w-10 h-10"/>
    <span className="py-1 px-2">
    {session?.user?.name ? capitalizeWords(session.user.name) : ''}
    </span>
  </div>
  </div>
 <div>
  <Dashboard  contactFormData={contactFormData}/>
 </div>
  </div>
  </Layout>
}


export async function getServerSideProps() {
  try {
    // Connect to MongoDB
    await mongooseConnect();
    // Fetch contact form data
    const contactFormData = await Contact.find();
    

    return {
      props: {
        contactFormData: JSON.parse(JSON.stringify(contactFormData))
      }
    };
  } catch (error) {
    console.error('Error fetching contact form data:', error);
    return {
      props: {
        contactFormData: []
      }
    };
  }
}