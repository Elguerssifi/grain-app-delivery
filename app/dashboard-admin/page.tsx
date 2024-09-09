"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminNav from "../Components/Admin/Dashboard/AdminNav/AdminNav";
import AdminPanel from "../Components/Admin/Dashboard/AdminPanel/AdminPanel";
import styles from "./dashboard-admin.module.css";
import LoadingDots from '../Components/LoadingDots/LoadingDots';

const DashboardAdmin = () => {
  const [loading, setLoading] = useState(true); // Initial state is loading
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true';
      
      if (!isAuthenticated) {
        router.push('/login-admin');
      } else {
        setLoading(false); // Set loading to false when authenticated
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <LoadingDots />; // Show loading state while checking authentication
  }

  return (
    <div className={styles.admin_page}> 
      <AdminNav />
      <AdminPanel />
    </div>
  );
};

export default DashboardAdmin;
