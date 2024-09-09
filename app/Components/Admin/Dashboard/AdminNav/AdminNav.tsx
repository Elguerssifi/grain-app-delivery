"use client";
import { useRouter } from 'next/navigation';
import styles from "./AdminNav.module.css";

const AdminNav = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    router.push('/login-admin');
  };

  return ( 
    <nav className={styles.navbar}>
      <div className={styles.row}>
        <div className={styles.logo}>
          <p>Logo</p>
        </div>
        <div className={styles.admin_info}>
          <div className={styles.info}>
            <div className={styles.admin_username}>
              <h5>Si Ahmed</h5>
            </div>
          </div>
          <div className={styles.logout}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
