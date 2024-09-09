"use client"
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '../Container/container';
import Product from './Product';
import styles from './Products.module.css';
import LoadingDots from "../LoadingDots/LoadingDots"

interface ProductData {
  id: number;
  title: string;
  description: string;
  image: string; // Base64 string
}

const Products: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingDots />
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className={styles.products_section}>
      <div className={styles.heading}>
        <h2>Our Products</h2>
      </div>
      <Container>
        <div className={styles.row}>
          {products.map((product) => (
            <Product
              key={product.id}
              src={`data:image/jpeg;base64,${product.image}`} // Convert base64 to image src
              title={product.title}
              description={product.description}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Products;
