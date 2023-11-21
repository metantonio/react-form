import React, { useRef, useEffect } from 'react';

const TerminalOutput = ({ text, enter, setText }) => {
  const terminalRef = useRef(null);

  useEffect(() => {
    // Desplaza automáticamente hacia abajo para mostrar el final del texto
    if (terminalRef.current) {
      terminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
    }
  }, [text]);

  const handleKeyDown = (event) => {
    // Verifica si la tecla presionada es Enter (código 13)
    if (event.keyCode === 13 && enter) {
      enter();
      setText('');
    }
  };

  const terminalStyle = {
    backgroundColor: '#2E2E2E',
    color: '#FFFFFF',
    padding: '10px',
    fontFamily: 'monospace',
    whiteSpace: 'pre-wrap',
    overflowY: 'auto',
  };

  return (
    <pre
      style={terminalStyle}
      ref={terminalRef}
      onKeyDown={handleKeyDown} // Agrega el manejador de eventos de teclado
      tabIndex={0} // Necesario para que el elemento reciba eventos de teclado
    >
      {text}
      <div ref={terminalRef} />
    </pre>
  );
};

export default TerminalOutput;
