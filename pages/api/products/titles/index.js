import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return handleGetTitles(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handleGetTitles(req, res) {
  try {
    const titles = await prisma.product.findMany({
      select: {
        title: true,
      },
    });
    res.status(200).json(titles);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: `Database error: ${error.message}` });
  }
}
