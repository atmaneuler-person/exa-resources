import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // [SHARED PASSWORD MODE]
        // Anyone with the correct password can login.
        // Email is just collected for the session.
        
        const sharedPassword = process.env.ADMIN_PASSWORD || "exa1234";
        const isValidPassword = credentials.password === sharedPassword;

        if (isValidPassword && credentials.email) {
            // Return user object with their entered email
            return { 
                id: "shared-user", 
                name: "Guest User", 
                email: credentials.email as string 
            };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login', // Custom login page
  },
  callbacks: {
      async jwt({ token, user }) {
          if (user) {
              token.id = user.id;
          }
          return token;
      },
      async session({ session, token }) {
          if (session.user) {
             // session.user.id = token.id as string;
          }
          return session;
      }
  }
})
