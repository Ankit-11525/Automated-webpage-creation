// pages/api/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { validateAdmin } from '../../utils/auth';

export default function login(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = req.body;

  if (validateAdmin(username, password)) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
}
