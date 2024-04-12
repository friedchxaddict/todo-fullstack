import { useState, useEffect } from 'react';
import { User } from '../components/types';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

interface UserProfilePageProps {
  user: User | null;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
  const token = localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setUserData({
        ...user,
        password: user.password || '',
      });
    }
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (userData && token) {
        if (
          currentPassword ||
          newPassword ||
          confirmNewPassword ||
          !currentPassword ||
          !newPassword ||
          !confirmNewPassword
        ) {
          if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
          }
          if (!userData.password) {
            setError('Current password is incorrect.');
            return;
          }
          const isPasswordValid = await bcrypt.compare(
            currentPassword,
            userData.password
          );
          if (!isPasswordValid) {
            setError('Current password is incorrect.');
            return;
          }

          userData.password = await bcrypt.hash(newPassword, 10);
        }

        const url = `http://localhost:4000/users/${userData?.id}`;

        await axios.patch(url, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsEditing(false);
        setError('');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else {
      if (userData) {
        setUserData((prevData: User | null) => ({
          ...(prevData as User),
          [name]: value,
        }));
      }
    }
  };

  if (!user) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>
        User Name:{' '}
        {isEditing ? (
          <input
            type="text"
            name="username"
            value={userData?.username}
            onChange={handleChange}
          />
        ) : (
          userData?.username
        )}
      </p>
      <p>
        Email:{' '}
        {isEditing ? (
          <input
            type="text"
            name="email"
            value={userData?.email}
            onChange={handleChange}
          />
        ) : (
          userData?.email
        )}
      </p>
      <p>
        Password:{' '}
        {isEditing ? (
          <>
            <input
              type="password"
              name="currentPassword"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current Password"
              required
            />
            <input
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New Password"
              required
            />
            <input
              type="password"
              name="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              placeholder="Confirm New Password"
              required
            />
            {error && <p>{error}</p>}
          </>
        ) : (
          <span>********</span>
        )}
      </p>
      {isEditing ? (
        <button onClick={handleSaveClick}>Save Information</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default UserProfilePage;
