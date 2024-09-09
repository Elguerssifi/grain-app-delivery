import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Count total orders
      const totalOrders = await prisma.myOrder.count();
      res.status(200).json({ count: totalOrders });
    } catch (error) {
      res.status(500).json({ error: "Failed to count orders." });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
