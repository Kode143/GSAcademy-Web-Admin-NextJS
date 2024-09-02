
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import { mongooseConnect } from '@/lib/mongoose';
import { Contact } from '@/models/contact';
import Image from "next/image";

export default function Home({contactFormData}) {
  const{data: session} = useSession();

  const capitalizeWords = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };


  return <Layout>

  <div className="flex flex-col ">
  <div className="flex justify-between">
  <h1>
  Welcome, <b>{session?.user?.name ? capitalizeWords(session.user.name) : ''}</b>
  </h1>
  <div className="bg-gray-700 flex text-white gap-1 rounded-lg overflow-hidden">
      {session?.user?.image && (
        <Image 
          src={session.user.image} 
          alt="User Image" 
          height={40} 
          width={40} 
          className="object-cover"
        />
      )}
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