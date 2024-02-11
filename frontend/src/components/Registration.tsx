import { useState, ChangeEvent } from 'react';
import axios, { AxiosError } from 'axios';

interface CustomError {
  message: string;
}

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
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
      const response = await axios.post('users/register', formData);
      const { token } = response.data;
      localStorage.setItem('token', token);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.data?.message) {
            setError({ message: axiosError.response.data.message });
          } else {
            setError('Unknown error');
          }
        } else {
          setError('Unknown error');
    }
  };

  return <div>Registration</div>;
};

export default Registration;
