//import { useEffect } from 'react';
import { User } from '../components/types';
//import axios from 'axios';

const UserProfilePage = ({ user }: { user: User | null }) => {
  //const token = localStorage.getItem('token');

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:4000/user', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       console.log('User data:', response.data);
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };
  //   if (token && user) {
  //     fetchUserData();
  //   }
  // }, [token, user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>User Name: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfilePage;
