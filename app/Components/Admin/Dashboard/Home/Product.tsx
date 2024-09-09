import React from "react";
import styles from "./Home.module.css";
import { useRouter } from 'next/navigation';

interface ProductProps {
  id: number;
  name: string;
  createdAt: string;
  imageUrl: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void; // Add onEdit prop
}

const Product: React.FC<ProductProps> = ({ id, name, createdAt, imageUrl, onDelete, onEdit }) => {
  const router = useRouter();

  const handleDelete = () => {
    onDelete(id);
  };

  const handleUpdate = () => {
    onEdit(id); // Call onEdit handler
  };

  return (
    <tr className={styles.productRow}>
      <td className={styles.productImageCell}>
        <img src={imageUrl} alt={name} className={styles.productImage} />
      </td>
      <td className={styles.productNameCell}>
        <span className={styles.productName}>{name}</span>
      </td>
      <td className={styles.createdAtCell}>{createdAt}</td>
      <td className={styles.actionsCell}>
        <button className={styles.updateButton} onClick={handleUpdate}>Update</button>
        <button className={styles.deleteButton} onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
};

export default Product;
