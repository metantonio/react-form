import React from 'react';

const InstructionsViewer = ({ documentPath }) => {
  const iframeStyle = {
    width: '100%',
    height: '500px', // Ajusta la altura según tus necesidades
    border: '1px solid #ddd',
  };

  return (
    <iframe
      src={documentPath}
      title="Document Viewer"
      style={iframeStyle}
      frameBorder="0"
      allowFullScreen
    />
  );
};

export default InstructionsViewer;
