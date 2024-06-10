import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from '@/lib/mongodb';
import { getServerSession } from "next-auth/server";

const adminEmails = ['sthabhuwan168@gmail.com'];

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  adapter: MongoDBAdapter(await clientPromise), // Ensure clientPromise is awaited here
  callbacks: {
    session: async ({ session, token, user }) => {
      if (!user) {
        throw new Error('No user found in session callback');
      }

      if (adminEmails.includes(user.email)) {
        return session;
      } else {
        return false;
      }
    },
  },
};

export default NextAuth(authOptions);

export async function isAdminRequest(req, res) {
  const session = await getServerSession({ req, res });

  if (!session?.user?.email || !adminEmails.includes(session.user.email)) {
    res.status(401).end();
    throw new Error('Not admin');
  }
}
