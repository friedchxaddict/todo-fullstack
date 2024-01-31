import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function respond() {
      const response = await fetch('http://localhost:3000');
      const message2 = await response.json();
      console.log(message2);
      setMessage(message2);
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
