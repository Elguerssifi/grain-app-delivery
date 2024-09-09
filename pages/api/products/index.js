import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import { Buffer } from 'buffer';

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.memoryStorage(),
});

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return handlePost(req, res);
    case 'GET':
      return handleGet(req, res);
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function handlePost(req, res) {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: 'Error uploading file' });
    }
    const { title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
      // Convert buffer to base64
      const imageBase64 = req.file.buffer.toString('base64');

      const newProduct = await prisma.product.create({
        data: {
          title,
          description,
          image: Buffer.from(imageBase64, 'base64'), // Convert base64 string to buffer
        },
      });

      res.status(200).json({
        message: 'Product created successfully!',
        data: newProduct,
      });
    } catch (error) {
      console.error('Database Error:', error);
      res.status(500).json({ error: `Database error: ${error.message}` });
    }
  });
}

async function handleGet(req, res) {
  try {
    const products = await prisma.product.findMany();
    // Convert buffer to base64 string
    const productsWithBase64 = products.map(product => ({
      ...product,
      image: product.image.toString('base64'), // Convert buffer to base64 string
    }));
    res.status(200).json(productsWithBase64);
  } catch (error) {
    console.error('Database Error:', error);
    res.status(500).json({ error: `Database error: ${error.message}` });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
