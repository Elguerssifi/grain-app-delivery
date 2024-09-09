"use client"
import Container from "../Container/container";
import styles from "./Footer.module.css"
import Link from "next/link";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return ( 
    <footer className={styles.footer}>
      <Container>
        <div className={styles.row}>
          <div className={styles.logo_and_description}>
            <div className={styles.logo}>
              <h4>Logo</h4>
            </div>
            <div className={styles.description}>
              <p>Si Ahmed Corp offers premium agricultural commodities, sourced globally from Canada, the US, and Russia. We ensure quality through independent inspection and certification before shipment. Our services include Supplier/Buyer Identification, Purchasing, Brokerage, Contracting, Shipping, Warehousing, and Delivery. Trust Si Ahmed Corp for reliable and top-quality products.</p>
            </div>
          </div>
          <div className={styles.link_area}>
            <div className={styles.title}>
              <h4>Quick Links</h4>
            </div>
            <div className={styles.links}>
              <Link href="/">Home</Link>
              <Link href="/#About">About Us</Link>
              <Link href="/products">Products</Link>
              <Link href="/order-form">Order Form</Link>
              <Link href="/#Contact">Contact Us</Link>
            </div>
          </div>
          <div className={styles.contact}>
            <div className={styles.title}>
              <h4>Contact</h4>
            </div>
            <div className={styles.description_contact}>
            <ul>
                <li>
                  <FaLocationDot /> 
                  <span>
                  90 Burnhamthorpe Rd. West, Canada <br />
                  3 Clunies Ross Court, Eight Mile Plains,
                  </span>
                </li>
                <li>
                  <SiGmail />
                  <span>siAhmed@gmail.com</span>
                </li>
                <li>
                  <FaPhoneAlt />
                  <span>+1 905.***.***</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
   );
}
 
export default Footer;