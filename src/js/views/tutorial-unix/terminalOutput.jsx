import React, { useRef, useEffect } from 'react';

const TerminalOutput = ({ text }) => {

  const terminalRef = useRef(null);

  useEffect(() => {
    // Desplaza automáticamente hacia abajo para mostrar el final del texto
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [text]);


  const terminalStyle = {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    padding: '10px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowY: 'auto',
  };

  return (
    <pre style={terminalStyle} ref={terminalRef}>
      {text}
      <div ref={terminalRef} />
    </pre>
  );
};

export default TerminalOutput;
