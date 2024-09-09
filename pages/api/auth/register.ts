import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/lib/prisma';
import bcrypt from 'bcrypt';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the admin user in the database
    const user = await prisma.adminUser.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({ message: 'Admin created successfully', user });
  } catch (error: any) {
    console.error('Error creating admin user:', error); // Log the full error

    // Return a more descriptive error message
    return res.status(500).json({
      message: 'Error creating admin user',
      error: error.message || 'Internal server error',
    });
  }
}
