import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
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
                console.log(currentUser)
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
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id
            session.user.name = token.name
            return session
        },
    },
    secret: process.env.NEXTAUTH_SECRET
});


export { authoptions as GET, authoptions as POST }