import React, { useState } from 'react';
import TerminalOutput from './terminalOutput.jsx';

const TestRunner = () => {
  const [lsCommand, setLsCommand] = useState(false);

  const handleCreateDirectory = async (endpoint) => {
    try {
      const response = await fetch(`http://localhost:3002/commands/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([]),
      });

      const data = await response.json();
      if(response.ok){
        setLsCommand(data.command)
      }
      console.log(data.message); // Mensaje del servidor
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div>
      <button onClick={()=>handleCreateDirectory('ls-command')}>ls -l</button>
      <button onClick={()=>handleCreateDirectory('test-1')}>test</button>
      {lsCommand ? <><TerminalOutput text={lsCommand} /></>: <></>}
    </div>
  );
};

export default TestRunner;
