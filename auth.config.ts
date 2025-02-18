import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // TODO: Leave it debug, update later
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      console.log("auth: ", auth);
      return isLoggedIn;
    },
    
  },
  providers: [],
} satisfies NextAuthConfig;
