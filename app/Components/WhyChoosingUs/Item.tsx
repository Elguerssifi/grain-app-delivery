"use client";
import styles from './WhyChoosingUs.module.css';

type ItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const Item: React.FC<ItemProps> = ({ icon, title, description }) => {
  return (
    <div className={styles.item_content}>
      <div className={styles.item_heading}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.item_title}>
          <h4>{title}</h4>
        </div>
      </div>
      <div className={styles.item_body}>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Item;
