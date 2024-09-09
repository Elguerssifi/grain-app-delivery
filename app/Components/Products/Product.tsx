"use client"
import { useState } from "react";
import Link from "next/link";
import styles from "./Products.module.css";

interface ProductProps {
  src: string;
  title: string;
  description: string;
}

const Product: React.FC<ProductProps> = ({ src, title, description }) => {
  const [isTruncated, setIsTruncated] = useState(true);
  const maxLength = 250;
  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedDescription = isTruncated
    ? description.slice(0, maxLength) + (description.length > maxLength ? "..." : "")
    : description;

  return (
    <div className={styles.product}>
      <div className={styles.product_image}>
        <img src={src} alt={title} />
      </div>
      <div className={styles.product_title}>
        <h3>{title}</h3>
      </div>
      <div className={styles.product_description}>
        <p>{truncatedDescription}</p>
        {description.length > maxLength && (
          <button onClick={toggleTruncate} className={styles.read_more}>
            {isTruncated ? "Read More" : "Show Less"}
          </button>
        )}
      </div>
      <div className={styles.product_link}>
        <Link href={`/order-form?product=${encodeURIComponent(title)}`}>
          Order Now
        </Link>
      </div>
    </div>
  );
};

export default Product;
