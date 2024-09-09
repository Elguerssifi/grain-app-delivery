import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/lib/prisma';
import bcrypt from 'bcrypt';

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await prisma.adminUser.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare hashed password with the one provided
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Check if the user has the "admin" role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, admin only' });
    }

    // Send response without including sensitive data
    return res.status(200).json({ message: 'Login successful', user: { id: user.id, username: user.username, role: user.role } });

  } catch (error) {
    return res.status(500).json({ message: 'Error logging in', error: error.message });
  }
}
