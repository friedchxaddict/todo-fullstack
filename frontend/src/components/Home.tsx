import React from 'react';
import { User } from './types';

interface HomeProps {
  user: User | null;
}

const Home: React.FC<HomeProps> = ({ user }) => {
  if (!user) return null;
  console.log(user);
  return (
    <div>
      <h1>Welcome back to your todo list {user.username}</h1>
    </div>
  );
};

export default Home;
