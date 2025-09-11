import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/db/connectDb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const authoptions = NextAuth({
    providers: [CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
            await connectDB();
            const user = await User.findOne({ email: credentials.email });
            const isValid = await bcrypt.compare(credentials.password, user.password);
            // const isValid = true
            console.log(credentials)
            console.log(user.password)
            console.log(isValid)

            if (!isValid) {
                // return new Response(JSON.stringify({ error: "Incorrect Password" }), { status: 400 });
                throw new Error("Password incorrect");
            }
            if (!user) {
                console.log("User not found")
                // return new Response(JSON.stringify({ error: "User not found" }), { status: 400 });
                throw new Error("User not found");
            }




            return {
                id: user._id.toString(),
                name: user.name,
                email: user.email
            };
        }
    }),
    GitHubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            if (account.provider === "google") {
                await connectDB()
                let currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    currentUser = await User.create({
                        email: user.email,
                        fullname: user.name || user.email.split("@")[0],
                        remember: false,
                        profilepic:user.image,
                        provider: "google"
                    })
                }
                return true
            }
            if (account.provider === "github") {
                await connectDB()
                let currentUser = await User.findOne({ email: user.email })
                if (!currentUser) {
                    currentUser = await User.create({
                        email: user.email,
                        fullname: user.name || user.email.split("@")[0],
                        profilepic:user.image,
                        remember: false,
                        provider: "github"   // ✅ fixed
                    })
                }
                return true
            }
            if (account.provider === "credentials") {
                // console.log(credentials)
                await connectDB()
                const currentUser = await User.findOne({ email: credentials.email })
                console.log("CurrentUser", currentUser)
                if (!currentUser) {
                    console.log("User not found")
                    return false
                }
                return true
            }
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user._id || token.id
                token.name = user.name
                token.email = user.email
            }
            console.log("Token", token)
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email;
            console.log("Session", session)
            return session
        },
    },
    pages: {
    signIn: "/feed",   // your custom login page
    error: "/login"     // redirect errors back to same page
  },
    
    secret: process.env.NEXTAUTH_SECRET
});


export { authoptions as GET, authoptions as POST }