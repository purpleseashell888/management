import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        // console.log(credentials, ">>>");
        try {
          const baseURL =
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000/proxy"
              : "http://api.jsonlee.cn";

          const response = await fetch(baseURL + "/base/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              captcha: credentials.captcha,
              captchaId: credentials.captchaId,
              password: credentials.password,
              username: credentials.name,
            }),
          });

          /**
           * 应该先判断ok再进行json处理
           */
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          // Parse the response
          const result = await response.json();
          // console.log(result);
          const token = result.data.token;
          // console.log(token);

          // Add logic here to look up the user from the credentials supplied
          if (result.data) {
            const user = result.data.user;

            // Return user object which contains name and roles
            return {
              name: user.userName,
              roles: user.userName,
              accessToken: token, // Include the token here};
            };
          } else {
            // If login fails, throw an error
            throw new Error(result.message || "Login failed");
          }
        } catch (error) {
          console.log(error);
          // Handle errors (e.g., network errors, incorrect credentials)
          throw new Error(error.message || "An error occurred during login");
        }
      },
    }),
  ],

  secret: "thequickbrownfox",
  // A random string used to hash tokens, sign cookies and generate cryptographic keys.

  callbacks: {
    async jwt({ token, user }) {
      // Add roles and access token to the token object
      if (user) {
        token.roles = user.roles;
        token.accessToken = user.accessToken; // Store the token in the JWT
      }
      return token;
    },

    async session({ session, token }) {
      // Add roles and access token to the session
      session.user.roles = token.roles;
      session.user.accessToken = token.accessToken; // Store the token in the session
      return session;
    },
  },
};

export default NextAuth(authOptions);
