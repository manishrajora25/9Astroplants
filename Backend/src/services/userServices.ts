import User, { IUserDoc } from '../models/user';

export async function createLocalUser(params: { email: string; password: string; name?: string }): Promise<IUserDoc> {
  const email = params.email.toLowerCase();
  const exists = await User.findOne({ email });
  if (exists) throw new Error('Email already in use');
  const user = new User({ email, name: params.name, provider: 'local' } as Partial<IUserDoc>);
  await user.setPassword(params.password);
  await user.save();
  return user;
}

export async function findUserById(id: string) {
  return User.findById(id);
}
