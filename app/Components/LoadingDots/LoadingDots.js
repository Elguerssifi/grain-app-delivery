"use client"
import styles from "./LoadingDots.module.css"
const LoadingDots = () => {
  return ( 
    <div className={styles.loadingContainer}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
   );
}
 
export default LoadingDots;
