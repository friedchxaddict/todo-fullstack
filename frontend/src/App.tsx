import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function respond() {
      const response = await fetch('http://localhost:3000');
      console.log(response);
      const message = await response.json();

      setMessage(message);
    }

    respond();
  }, []);
  return (
    <>
      <div>{message}</div>
    </>
  );
}

export default App;
