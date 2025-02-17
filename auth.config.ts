import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/auth/error", // Optional: error page
    newUser: undefined // Can handle this separately or leave it undefined
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
