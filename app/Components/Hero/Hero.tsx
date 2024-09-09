"use client";
import Link from "next/link";
import Container from "../Container/container";
import styles from "./Hero.module.css";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.row}>
          <div className={styles.heading}>
            <h1>Delivering farm products to global markets.</h1>
            <h3>Providing a full range of trade-related services, including complete support for importing and exporting goods.</h3>
            <div className={styles.button_heading}>
              <Link href="/order-form">submit offer</Link>
              <Link href="/products">our product</Link>
            </div>
          </div>
          <div className={styles.image_slider}>
            <div className={styles.image_container}>
              <img 
                src="/Assets/img_2.jpg" 
                alt="Si ahmed corps grain from canada to the world"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
