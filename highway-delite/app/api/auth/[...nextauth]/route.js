import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from 'jsonwebtoken';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user, account }) {
      // token is JWT; can add custom fields
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
