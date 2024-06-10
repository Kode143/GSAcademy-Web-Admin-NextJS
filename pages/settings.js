import Layout from '@/components/Layout';
import React from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Settings = () => {
  const { data: session } = useSession();

  const capitalizeWords = (name) => {
    return name.replace(/\b\w/g, char => char.toUpperCase());
  };

  return (
    <Layout>
      <div>
        Admin Details
      </div>
      <div className='mt-8'>
        <h2>
          Admin 1
        </h2>

        <div className="flex gap-8">
          <div>
            <h1>
              Full Name: <b>{session?.user?.name ? capitalizeWords(session.user.name) : ''}</b>
            </h1>
            <h3>Email: <b>{session?.user.email}</b></h3>
          </div>

          {session?.user?.image && (
            <div className="rounded-lg overflow-hidden">
              <Image 
                src={session.user.image} 
                alt="User Image" 
                height={100} 
                width={100} 
                className="object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
