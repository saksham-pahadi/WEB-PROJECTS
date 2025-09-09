import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from 'jsonwebtoken';
import connectDB from "@/db/connectDb";
import User from "@/models/User";

export const authoptions = NextAuth({
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" }
        },
        async authorize(credentials) {
            // console.log(credentials)
            await connectDB();
            const user = await User.findOne({ email: credentials.email });
            if (!user) {
                console.log("User not found")
                throw new Error("User not found");
            }




            return { name: user.fullname, email: user.email };
        }
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider == "google") {
                await connectDB()
                const currentUser = await User.find({ email: user.email })
                if (currentUser.length==0) {
                    const newUser = await User.create({
                        email: user.email,
                        fullname: user.email.split("@")[0],
                        remember: false,
                        provider: "google"
                    })

                }
                return true
            }
            if (account.provider === "credentials") {
                // console.log(credentials)
                await connectDB()
                const currentUser = await User.findOne({ email: credentials.email })
                console.log(currentUser)
                if (!currentUser) {
                    console.log("User not found")
                    return false
                }
                return true
            }
        },
        async jwt({ token, user, account }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, user, token }) {
            const dbUser = await User.findOne({ email: session.user.email })
            session.user.name = dbUser.fullname
            console.log(dbUser)
            return session
        },
    }
    // secret: process.env.NEXTAUTH_SECRET
});


export { authoptions as GET, authoptions as POST }