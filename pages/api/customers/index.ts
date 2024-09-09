import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const customers = await prisma.customer.findMany({
        include: {
          orders: true,
        },
      });
      res.status(200).json(customers);
    } catch (error : any) {
      res.status(500).json({ error: "Failed to fetch customers." });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
