//import { useState, useEffect } from 'react';
//import Form from './components/Form';
//import { User } from './components/types';

import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Registration from './components/Registration';
import Login from './components/Login';

const App: React.FC = () => {
  // const [message, setMessage] = useState('');

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:4000');
  //       const result = await response.text();
  //       setMessage(result);
  //     } catch (error) {
  //       console.error('Error fetching data', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // const handleSubmit = async (formData: User) => {
  //   try {
  //     const response = await fetch('http://localhost:4000/users', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch (error) {
  //     console.error('Error submitting form', error);
  //   }
  // };
  return (
    <>
      <Router>
        <Routes>
          {/*<div>
        <h1>{message}</h1>
      </div>
      <Form onSubmit={handleSubmit} />*/}
          <Route path="/home" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
