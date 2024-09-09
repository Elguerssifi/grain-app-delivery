import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../prisma/lib/prisma'; // Adjust the path if needed
import multer from 'multer';
import { Buffer } from 'buffer';

// Set up multer to store files in memory
const upload = multer({ storage: multer.memoryStorage() });

// Extend the NextApiRequest type to include file property
interface ExtendedNextApiRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

export const config = {
  api: {
    bodyParser: false, // Disable default body parsing
  },
};

const parseFormData = (req: ExtendedNextApiRequest) => {
  return new Promise<any>((resolve, reject) => {
    const data: any = {};
    let fileBuffer: Buffer | undefined;

    // Use multer middleware to handle file upload
    upload.single('file')(req as any, {} as any, (err) => {
      if (err) {
        return reject(err);
      }

      if (req.file) {
        fileBuffer = req.file.buffer;
        data.file = fileBuffer;
      }

      // Handle text fields
      if (req.body.title) {
        data.title = req.body.title;
      }
      if (req.body.description) {
        data.description = req.body.description;
      }

      resolve(data);
    });
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'DELETE') {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await prisma.product.delete({
        where: { id: Number(id) },
      });

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  } else if (req.method === 'GET') {
    try {
      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      const productWithBase64 = {
        ...product,
        image: product.image ? product.image.toString('base64') : null,
      };

      res.status(200).json(productWithBase64);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, description, file } = await parseFormData(req as ExtendedNextApiRequest);

      const product = await prisma.product.findUnique({
        where: { id: Number(id) },
      });

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      // Update only the fields that are provided
      const updatedProduct = await prisma.product.update({
        where: { id: Number(id) },
        data: {
          ...(title && { title }),
          ...(description && { description }),
          ...(file && { image: Buffer.from(file) }), // Store image as buffer
        },
      });

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else {
    res.setHeader('Allow', ['DELETE', 'GET', 'PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
