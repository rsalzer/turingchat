import DiscordProvider from "next-auth/providers/discord";

export const authOptions = {
  secret: process.env.SECRET,
  url: process.env.NEXTAUTH_URL,
  providers: [
    DiscordProvider({
      // @ts-ignore
      clientId: process.env.DISCORD_CLIENT_ID,
      // @ts-ignore
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      console.log(user);
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return false;
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
  },
};
