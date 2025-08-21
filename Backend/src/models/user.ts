import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  email: string;
  name?: string;
  passwordHash?: string;
  provider: 'local' | 'google';
  googleId?: string;
  emailVerified: boolean;
}

export interface IUserMethods {
  setPassword(password: string): Promise<void>;
  comparePassword(password: string): Promise<boolean>;
}

export type IUserDoc = Document & IUser & IUserMethods;

const userSchema = new mongoose.Schema<IUser, Model<IUserDoc>, IUserMethods>(
  {
    email: { type: String, unique: true, required: true, lowercase: true, trim: true },
    name: { type: String, trim: true },
    passwordHash: { type: String, select: false },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    googleId: { type: String, index: true },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.methods.setPassword = async function (password: string) {
  const saltRounds = 12;
  this.passwordHash = await bcrypt.hash(password, saltRounds);
};

userSchema.methods.comparePassword = async function (password: string) {
  if (!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

const User = mongoose.model<IUserDoc>('User', userSchema);
export default User;
