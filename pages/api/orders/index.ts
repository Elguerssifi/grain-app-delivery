import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, orders } = req.body;

    try {
      // Validate incoming data
      if (!fullName || !email || !orders || !Array.isArray(orders)) {
        return res.status(400).json({ error: 'Invalid data' });
      }

      // Check if customer already exists
      const existingCustomer = await prisma.customer.findUnique({
        where: { email }
      });

      if (existingCustomer) {
        // Customer exists: add new orders without deleting existing ones
        await prisma.myOrder.createMany({
          data: orders.map((order: { productName: string; quantity: string }) => ({
            product: order.productName,
            quantity: order.quantity,
            customerId: existingCustomer.id,
          })),
        });

        return res.status(200).json({ message: 'Orders updated successfully!' });
      } else {
        // Customer does not exist: create a new customer with orders
        const newCustomer = await prisma.customer.create({
          data: {
            fullName,
            email,
            orders: {
              create: orders.map((order: { productName: string; quantity: string }) => ({
                product: order.productName,
                quantity: order.quantity,
              })),
            },
          },
        });

        return res.status(201).json(newCustomer);
      }
    } catch (error) {
      console.error('Error handling order:', error);
      res.status(500).json({ error: 'Failed to handle order.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
