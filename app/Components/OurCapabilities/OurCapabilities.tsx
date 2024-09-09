"use client";
import styles from "./OurCapabilities.module.css";
import Container from "../Container/container";
import { SiVerizon } from "react-icons/si";

const capabilities = [
  "Ensure fast service by shipping all orders promptly",
  "Foster strong and long-lasting global partnerships",
  "Leverage market experience to add value for clients",
  "Exceptional customer service and relationships",
];

const OurCapabilities = () => {
  return (
    <section className={styles.our_capabilities}>
      <Container>
        <div className={styles.row}>
          <div className={styles.our_content_container}>
            <div className={styles.our_title}>
              <h3>Our Capabilities</h3>
            </div>
            <div className={styles.our_content}>
              <p>
                When you choose us as an exporter of grains such as lentils,
                chickpeas, and quinoa, be assured that we will be shipping
                top-quality products. Working directly with farmers and
                processing plants around the world, we ensure our customers
                receive the highest quality at the best value.
              </p>
              <ul>
                {capabilities.map((item, index) => (
                  <li key={index}>
                    <SiVerizon className={styles.icon} /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.our_image_container}>
            <img 
              src="/Assets/grain_our_capabilities.jpg" 
              alt="grain" 
            />
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurCapabilities;
