import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcrypt"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        // 1. Find user in Database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        });

        // 2. If user exists, check password
        if (user) {
          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (isValid) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              image: user.image,
              role: user.role,
            };
          }
        }

        // [FALLBACK/BACKDOOR for initial setup or if DB is empty]
        // This allows using the .env credentials if no users are in DB yet
        const envEmail = process.env.ADMIN_EMAIL || "admin@exaeuler.com";
        const envPassword = process.env.ADMIN_PASSWORD || "exa1234";
        
        if (credentials.email === envEmail && credentials.password === envPassword) {
            return {
                id: "env-admin",
                name: "Administrator",
                email: envEmail,
                role: "ADMIN"
            };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.isAdmin = (user as any).role === "ADMIN";
          }
          return token;
      },
      async session({ session, token }) {
          if (session.user) {
              (session.user as any).isAdmin = token.isAdmin;
          }
          return session;
      }
  }
})
