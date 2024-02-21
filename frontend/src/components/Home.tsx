import React from 'react';
import { User } from './types';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  if (!user) return null;
  return (
    <div>
      <h1>Welcome back to your todo list {user.name}</h1>
    </div>
  );
};

export default Home;
