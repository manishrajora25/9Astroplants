import dotenv from 'dotenv';
dotenv.config();

export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 4000),
  mongoUri: process.env.MONGO_URI as string,
  jwt: {
    accessSecret: process.env.JWT_SECRET as string,
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    accessExpires: process.env.JWT_ACCESS_EXPIRES || '15m',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || '7d',
  },
  cookieDomain: process.env.COOKIE_DOMAIN || 'localhost',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL as string,
  }
};

if (!env.mongoUri) throw new Error('MONGO_URI missing');
if (!env.jwt.accessSecret || !env.jwt.refreshSecret) throw new Error('JWT secrets missing');
if (!env.google.clientId || !env.google.clientSecret || !env.google.callbackURL) {
  console.warn('Google OAuth env vars missing (only needed if using Google login).');
}
