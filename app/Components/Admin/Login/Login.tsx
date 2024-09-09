// pages/login.tsx
"use client";
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import styles from './Login.module.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/api/auth/login', { username, password });
      if (response.status === 200) {
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication flag
        router.push('/dashboard-admin');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.row}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Your username"
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Your password"
              required
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.submit_button}>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
