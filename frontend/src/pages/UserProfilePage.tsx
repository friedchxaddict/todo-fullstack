import { useState, useEffect } from 'react';
import { User } from '../components/types';
import axios from 'axios';

interface UserProfilePageProps {
  user: User | null;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ user }) => {
  const token = localStorage.getItem('token');
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<User | null>(user);

  console.log(userData);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const url = `http://localhost:4000/users/${userData?.id}`;
      console.log('PUT URL', url);
      console.log('PUT Data:', userData);

      const response = await axios.put(
        `http://localhost:4000/users/${userData?.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('PUT Response:', response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userData) {
      setUserData((prevData: User | null) => ({
        ...((prevData as User) || {}),
        [name]: value,
      }));
    }
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
            name="name"
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
      {isEditing ? (
        <button onClick={handleSaveClick}>Save Information</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default UserProfilePage;
