import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import User, { IUserDoc } from '../models/user';
import { env } from './env';

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password', session: false },
  async (email: string, password: string, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() }).select('+passwordHash');
      if (!user) return done(null, false, { message: 'Invalid credentials' });
      const ok = await user.comparePassword(password);
      if (!ok) return done(null, false, { message: 'Invalid credentials' });
      return done(null, user);
    } catch (e) {
      return done(e as Error);
    }
  }
));

passport.use(new GoogleStrategy(
  {
    clientID: env.google.clientId,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL,
  },
  async (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done) => {
    try {
      const email = profile.emails?.[0]?.value?.toLowerCase();
      const googleId = profile.id;
      let user = await User.findOne({ $or: [{ email }, { googleId }] });
      if (!user) {
        user = await User.create({
          email,
          name: profile.displayName,
          googleId,
          provider: 'google',
          emailVerified: true,
        } as Partial<IUserDoc>);
      } else {
        if (!user.googleId) {
          user.googleId = googleId;
          user.provider = user.provider || 'google';
          await user.save();
        }
      }
      return done(null, user);
    } catch (e) {
      return done(e as Error);
    }
  }
));

export default passport;
