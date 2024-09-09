import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Count total customers
      const totalCustomers = await prisma.customer.count();
      res.status(200).json({ count: totalCustomers });
    } catch (error) {
      res.status(500).json({ error: "Failed to count customers." });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
