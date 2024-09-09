// src/app/components/Profile.tsx
import { useState } from 'react';
import styles from "./Profile.module.css";

const Profile = () => {
  const [oldUsername, setOldUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      window.alert('New password and password confirmation do not match');
      return;
    }
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldUsername, newUsername, oldPassword, newPassword, confirmNewPassword }),
      });

      const data = await response.json();
      
      if (response.ok) {
        window.alert('User updated successfully');
        // Clear form fields
        setOldUsername('');
        setNewUsername('');
        setOldPassword('');
        setNewPassword('');
        setConfirmNewPassword('');
        setError(null);
      } else {
        window.alert(data.error)
      }
    } catch (error) {
      setError('An error occurred while updating the profile.');
    }
  };

  return ( 
    <div className={styles.profile_admin_container}>
      <div className={styles.row}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_container}>
            <label>Old Username</label>
            <input
              type="text"
              name="oldUsername"
              placeholder="Enter Old Username"
              value={oldUsername}
              onChange={(e) => setOldUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>New Username</label>
            <input
              type="text"
              name="newUsername"
              placeholder="Enter New Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>Old Password</label>
            <input
              type="password"
              name="oldPassword"
              placeholder="Enter Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.input_container}>
            <label>Confirm New Password</label>
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <div className={styles.submit_button}>
            <button type="submit">Update</button>
          </div>
          {error && <div className={styles.error}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Profile;
