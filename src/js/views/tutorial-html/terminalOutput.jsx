import React from 'react';

const TerminalOutput = ({ text }) => {
  const terminalStyle = {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    padding: '10px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowY: 'auto',
  };

  return (
    <pre style={terminalStyle}>
      {text}
    </pre>
  );
};

export default TerminalOutput;
