import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import { generateAccessToken } from "../auth/tools.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refresh_Token, profile, passportNext) => {
    const user = await userSchema.find({ googleId: profile.id });

    if (user) {
      const token = generateAccessToken({ id: user.id });

      passportNext(null, { token });
    } else {
      const newUser = new userSchema({
        googleId: profile.id,
        userName: profile.displayName,
        email: profile.emails[0].value,
      });
      await userSchema.save();
      const token = generateAccessToken({ id: newUser.id });
      passportNext(null, { token });
    }
  }
);

passport.serializeUser(function (userData, passportNext) {
  passportNext(null, userData);
});

export default googleStrategy;
