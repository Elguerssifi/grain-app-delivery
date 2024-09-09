import React from "react";
import styles from "./Customers.module.css";

interface Order {
  product: string;
  quantity: string;
}

interface CustomerProps {
  fullName: string;
  email: string;
  orders: Order[];
}

const Customer: React.FC<CustomerProps> = ({ fullName, email, orders }) => {
  return (
    <tr className={styles.customerRow}>
      <td className={styles.customerNameCell}>{fullName}</td>
      <td className={styles.customerEmailCell}>{email}</td>
      <td className={styles.customerOrdersCell} colSpan={2}>
        {orders
          .map((order) => `${order.product} (${order.quantity})`)
          .join(", ")}
      </td>
    </tr>
  );
};

export default Customer;
