import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/lib/prisma';
import bcrypt from 'bcrypt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    try {
      const { oldUsername, newUsername, oldPassword, newPassword, confirmNewPassword } = req.body;

      // Validate inputs
      if (!oldUsername || !newUsername || !oldPassword || !newPassword || newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'Invalid input' });
      }

      // Find user by old username
      const user = await prisma.adminUser.findUnique({
        where: { username: oldUsername },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Verify old password
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Incorrect old password' });
      }

      // Hash new password
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);

      // Update user
      const updatedUser = await prisma.adminUser.update({
        where: { username: oldUsername },
        data: {
          username: newUsername,
          password: hashedNewPassword,
        },
      });

      // Do not send sensitive data in response
      return res.status(200).json({ message: 'User updated successfully', user: { id: updatedUser.id, username: updatedUser.username } });
    } catch (error : any) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
