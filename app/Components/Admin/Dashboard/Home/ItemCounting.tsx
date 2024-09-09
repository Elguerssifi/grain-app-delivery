import styles from "./Home.module.css";
interface ItemProps {
  title: string;
  counter: number;
}

const ItemCounting: React.FC<ItemProps> = ({ title, counter }) => {
  return (
    <div className={styles.item}>
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.counter}>{counter}</p>
    </div>
  );
};

export default ItemCounting;
