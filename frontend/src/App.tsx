import { useState } from 'react';
import { User } from './components/types';

import './App.css';
import { useNavigate, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';
import UserProfilePage from './pages/UserProfilePage';
import axios from 'axios';

interface CustomError {
  message: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const [error, setError] = useState<CustomError | string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (formData: {
    username: string;
    password: string;
  }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/users/login',
        formData
      );

      const { token, user: loggedInUser } = response.data;
      localStorage.setItem('token', token);
      setUser(loggedInUser.user);
      navigate('/home');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message ||
              'An error occurred. Please try again.'
          );
        } else if (error.request) {
          setError('No response received from the server. Please try again.');
        } else {
          setError('Error in sending the request. Please try again.');
        }
      } else {
        console.error('An error occurred:', error);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <>
      <Routes>
        <Route path="/home" element={<Home user={user} />} />
        <Route path="/registration" element={<Registration />} />
        <Route
          path="/"
          element={<Login onLogin={handleLogin} navigate={navigate} />}
        />
        <Route path="/profile" element={<UserProfilePage user={user} />} />
      </Routes>
    </>
  );
};

export default App;
