import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Customers.module.css";

interface CustomerOrder {
  product: string;
  quantity: number;
}

interface CustomerData {
  fullName: string;
  email: string;
  orders: CustomerOrder[];
}

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerData[]>([]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get<CustomerData[]>("/api/customers");
        setCustomers(response.data);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchCustomers();
  }, []);

  return (
    <div className={styles.customers_container}>
      <h4>Customers</h4>
      <table className={styles.customerTable}>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Orders + Quantity</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.fullName}</td>
              <td>{customer.email}</td>
              <td>
                {customer.orders.map((order, i) => (
                  <div key={i}>
                    {order.product} - {order.quantity} kg
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
