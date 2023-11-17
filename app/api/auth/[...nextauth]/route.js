import nextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
import User from "@model/user";

const handler = nextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionuser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionuser._id.toString();
      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDB();
        if (await User.findOne({ email: profile.email })) {
          return true;
        }
        console.log(profile.name);
        // if not, create user in database
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),
          image:
            profile.picture ||
            "https://res.cloudinary.com/dq7l8216n/image/upload/v1622711879/nextjs-mongodb-cloudinary/placeholder-image.jpg",
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },


  },
});

export { handler as GET, handler as POST };
