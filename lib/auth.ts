import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.password) return null;

        const adminEmail = process.env.ADMIN_EMAIL || "admin@exaeuler.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "exa123456";
        const outsiderPassword = process.env.OUTSIDER_PASSWORD || "exa7890";

        // 1. Admin Login: Check BOTH Email and Password
        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "admin-user",
            name: "Administrator",
            email: adminEmail,
            role: "ADMIN",
          };
        }

        // 2. Outsider Login: Check ONLY Password (Ignore Email)
        if (credentials.password === outsiderPassword) {
          return {
            id: "outsider-user",
            name: "External Visitor",
            email: credentials.email as string, // Keep the entered email for identification
            role: "USER", // Assigned regular USER role (only Docs access)
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
