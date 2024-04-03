import { useState } from 'react';
import axios from 'axios';

const ChangePassword = ({ userId }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'currentPassword') setCurrentPassword(value);
    if (name === 'newPassword') setNewPassword(value);
    if (name === 'confirmNewPassword') setConfirmNewPassword(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/change-password',
        {
          userId,
          currentPassword,
          newPassword,
        }
      );
      console.log('Password changed successfully');
      setError('');
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        name="currentPassword"
        value={currentPassword}
        onChange={handleChange}
        placeholder="Current Password"
        required
      />
      <input
        type="password"
        name="newPassword"
        value={newPassword}
        onChange={handleChange}
        placeholder="New Password"
        required
      />
      <input
        type="password"
        name="confirmNewPassword"
        value={confirmNewPassword}
        onChange={handleChange}
        placeholder="Confirm New Password"
        required
      />
      {error && <p>{error}</p>}
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
