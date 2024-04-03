import { useState, useEffect } from 'react';
import { User } from '../components/types';
import axios from 'axios';
import ChangePassword from '../components/ChangePassword';

interface UserProfilePageProps {
  user: User | null;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
  const token = localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);
  const [passwordInputValue, setPasswordInputValue] = useState('');

  console.log(userData);

  useEffect(() => {
    setUserData(user);
    setPasswordInputValue(
      user?.password ? '.'.repeat(user.password.length) : ''
    );
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      if (userData && token) {
        const url = `http://localhost:4000/users/${userData?.id}`;

        await axios.patch(url, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsEditing(false);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData((prevData: User | null) => ({
        ...(prevData as User),
        [name]: value,
      }));
    }
    console.log(userData);
  };

  if (!user) {
    return <div>Loading...</div>;
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
          <ChangePassword userId={userData?.id} />
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
