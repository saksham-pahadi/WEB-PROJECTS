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


            if (!isValid) {
                throw new Error("Password incorrect");
            }
            if (!user) {
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
                        profilepic: user.image,
                        provider: "google"
                    })
                }
                if (currentUser) {
                    let PFP = await currentUser.profilepic
                    if (PFP === null) {
                        currentUser.profilepic = user.image;
                        await currentUser.save();
                    }

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
                        profilepic: user.image,
                        remember: false,
                        provider: "github"
                    })
                }
                if (currentUser) {
                    let PFP = await currentUser.profilepic
                    if (PFP === null) {
                        currentUser.profilepic = user.image;
                        await currentUser.save();
                    }

                }
                return true
            }
            if (account.provider === "credentials") {
                await connectDB()
                const currentUser = await User.findOne({ email: credentials.email })
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
            // console.log("Token", token)
            return token
        },
        async session({ session, token }) {
            const dbUser = await User.findOne({ email: session.user.email });
            session.user.id = token.id
            session.user.name = token.name
            session.user.email = token.email;
            session.user.image = dbUser.profilepic;
            // console.log("Session", session)
            return session
        },
    },
    pages: {
        signIn: "/home",
        error: "/login"
    },

    secret: process.env.NEXTAUTH_SECRET
});


export { authoptions as GET, authoptions as POST }