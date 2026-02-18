import { NextAuthOptions } from "next-auth"
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
// import { compare } from "bcryptjs"
// import { db } from "./db"

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(db), // Temporarily disabled
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Temporary demo authentication - replace with database lookup
        if (credentials.email === "demo@invoicestack.com" && credentials.password === "password") {
          return {
            id: "demo-user",
            email: credentials.email,
            name: "Demo User",
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
}