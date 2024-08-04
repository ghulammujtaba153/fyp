import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "1038039162237-3gn8g5lep4adjt13i38chfc9hqamn9mh.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
  pages: {
    signIn: '/login', // Custom login page
    signOut: '/auth/signout',
    error: '/auth/error', // Custom error page
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn callback', { user, account, profile, email, credentials });
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (profile) {
        token.id = profile.sub;
        token.name = profile.name;
        token.email = profile.email;
        token.picture = profile.picture;
      }
      return token;
    },
  },
  debug: true,
});

export { handler as GET, handler as POST };
