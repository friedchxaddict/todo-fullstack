import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000');
        const result = await response.text();
        setMessage(result);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div>
        <h1>{message}</h1>
      </div>
      <form>
        <input />
        <input />
        <button>Send</button>
      </form>
    </>
  );
}

export default App;
