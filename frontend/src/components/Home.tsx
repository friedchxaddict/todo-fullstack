import React from 'react';
import { User } from './types';
import { useNavigate } from 'react-router-dom';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  const navigate = useNavigate();

  if (!user) return null;

  const handleProfileClick = () => {
    navigate('/profile', { state: { user } });
  };
  return (
    <div>
      <h1>Welcome back to your todo list {user.username}</h1>
      <button onClick={handleProfileClick}>View Profile</button>
    </div>
  );
};

export default Home;
