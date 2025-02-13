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
    redirect({ url, baseUrl }) {
      if (url === baseUrl || baseUrl.startsWith(baseUrl)) {
        return `${baseUrl}/`;
      }
      return url;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
