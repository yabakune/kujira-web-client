import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

import * as Constants from "@/constants";

export default NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const loginResponse = await fetch(`${Constants.APIRoutes.AUTH}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const verifyLogin = await fetch(
          `${Constants.APIRoutes.AUTH}/verify-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          }
        );

				
      },
    }),
  ],
});
