import { Request, Response } from 'express';
import  {findUserById}  from '../services/userServices';
import catchAsync from '../utils/CatchAsync';

export const me = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const user = await findUserById(userId);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    provider: user.provider,
  });
});
