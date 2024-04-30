import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { Heading, Button, Card, Input, Flex } from '@chakra-ui/react';

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
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100vh"
      width="100vw">
      <Card
        bg="#333333"
        maxW="300px"
        h="400px"
        borderColor="#FFA07A"
        borderWidth="4px"
        borderRadius="lg">
        <Heading as="h2" color="#EFEFEF">
          Login
        </Heading>
        {error && typeof error === 'string' && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
            mb={3}
          />
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            autoComplete="current-password"
            required
            mb={3}
          />
          <Button bg="#FFA07B" type="submit">
            Login
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export default Login;
