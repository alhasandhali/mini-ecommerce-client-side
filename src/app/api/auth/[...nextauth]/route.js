import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `https://techtrove-server-side.vercel.app/login`,
            {
              email: credentials.email,
              password: credentials.password,
            }
          );
          const user = res.data.user;
          if (user) return user;
          return null;
        } catch (err) {
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },

  pages: { signIn: "/login" },

  callbacks: {
    // --- NEW: Google signup handler ---
    async signIn({ user, account }) {
      if (account.provider === "google") {
        // Save Google user to your backend
        await axios.post(
          `https://techtrove-server-side.vercel.app/google-signup`,
          {
            email: user.email,
            name: user.name,
            googleId: user.id,
          }
        );
      }
      return true;
    },

    // JWT callback
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id || user.sub;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },

    // Session callback
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.email = token.email;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
