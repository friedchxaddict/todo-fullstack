import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';

interface CustomError {
  message: string;
}

interface Props {
  onLogin: (formdata: { username: string; password: string }) => void;
  navigate: (path: string) => void;
}

const Login: React.FC<Props> = ({ onLogin, navigate }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState<CustomError | string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:4000/users/login',
        formData
      );
      const { token } = response.data;
      localStorage.setItem('token', token);
      onLogin(formData);
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
    <div>
      <h2>Login</h2>
      {error && typeof error === 'string' && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          autoComplete="current-password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
