import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db";

export const authOptions = {
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    jwt: true,
  },

  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      async authorize(credentials) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }

        const client = await connectToDatabase();

        const usersCollection = client.db().collection("users");

        // Add logic here to look up the user from the credentials supplied
        const user = await usersCollection.findOne({
          name: credentials.name,
        });

        if (!user) {
          client.close();
          throw new Error("No user found!");
        }

        if (credentials.password !== user.password) {
          throw new Error("Could not log you in!");
        }
        client.close();

        return { name: user.name, roles: user.roles };
      },
    }),
  ],

  secret: "thequickbrownfox",
  // A random string used to hash tokens, sign cookies and generate cryptographic keys.

  callbacks: {
    async jwt({ token, user }) {
      // Add roles to the token
      if (user) {
        token.roles = user.roles;
      }
      return token;
    },

    async session({ session, token }) {
      // Add roles to the session
      session.user.roles = token.roles;
      return session;
    },
  },
};

export default NextAuth(authOptions);
