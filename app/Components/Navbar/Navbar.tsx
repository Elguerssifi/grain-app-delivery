"use client"
import Link from "next/link";
import styles from './Navbar.module.css'
import Container from "../Container/container";

const Navbar = () => {
  return ( 
    <nav className={styles.navbar}>
      <Container>
        <div className={styles.row}>
          <div className={styles.logo}>
            <Link href="#home">
              Logo
            </Link>
          </div>
          <div className={styles.link_area}>
            <Link href="/">Home</Link>
            <Link href="/#About">About Us</Link>
            <Link href="/products">Products</Link>
            <Link href="/order-form">Order Form</Link>
            <Link href="/#Contact">Contact Us</Link>
          </div>
        </div>
      </Container>
    </nav>
   );
}
 
export default Navbar;