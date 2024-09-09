"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import ItemCounting from "./ItemCounting";
import Container from "@/app/Components/Container/container";
import Product from "./Product";

interface HomeProps {
  onEdit: (id: number) => void; // Prop to handle edit action
}

const Home: React.FC<HomeProps> = ({ onEdit }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [totalOrders, setTotalOrders] = useState<number>(0);
  const [totalCustomers, setTotalCustomers] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productResponse = await axios.get('/api/products');
        setProducts(productResponse.data);

        // Fetch total orders
        const ordersResponse = await axios.get('/api/orders/count');
        setTotalOrders(ordersResponse.data.count);

        // Fetch total customers
        const customersResponse = await axios.get('/api/customers/count');
        setTotalCustomers(customersResponse.data.count);

      } catch (error) {
        setError('Failed to fetch data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/products/${id}`);
        setProducts(products.filter((product: any) => product.id !== id));
        alert('Product deleted successfully');
      } catch (error) {
        console.error('Error deleting product', error);
        alert('Failed to delete product');
      }
    }
  };

  const data = [
    { title: "Total Products", counter: products.length },
    { title: "Total Orders", counter: totalOrders },
    { title: "Total Customers", counter: totalCustomers },
  ];

  return (
    <div className={styles.home_container}>
      <Container>
        <div className={styles.row}>
          <div className={styles.counter_info}>
            {data.map((item, index) => (
              <ItemCounting 
                key={index} 
                title={item.title} 
                counter={item.counter} 
              />
            ))}
          </div>
          <div className={styles.products_container}>
            <h4>Products</h4>
            {loading ? (
              <p>Loading products...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <table className={styles.productTable}>
                <thead>
                  <tr>
                    <th>Product Image</th>
                    <th>Product Name</th>
                    <th>Created At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product: any) => (
                    <Product 
                      key={product.id} 
                      id={product.id} 
                      name={product.title} 
                      createdAt={new Date(product.createdAt).toLocaleDateString()} 
                      imageUrl={`data:image/jpeg;base64,${product.image}`} 
                      onDelete={handleDelete} 
                      onEdit={onEdit} // Pass onEdit handler
                    />
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
