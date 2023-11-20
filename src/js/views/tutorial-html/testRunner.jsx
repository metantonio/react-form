import React, { useState } from 'react';

const TestRunner = () => {
  const [directoryName, setDirectoryName] = useState('');

  const handleCreateDirectory = async () => {
    try {
      const response = await fetch('http://localhost:3002/commands/ls-command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      });

      const data = await response.json();
      console.log(data.message); // Mensaje del servidor
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateDirectory}>Read ls command</button>
    </div>
  );
};

export default TestRunner;
