import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function respond() {
      const response = await fetch('http://localhost:3000');
      const message2 = await response.json();
      setMessage(message2);
    }

    respond();
  }, []);
  return (
    <>
      <div>
        <h1>{message}</h1>
      </div>
    </>
  );
}

export default App;
