import React from 'react';



const TestButton = (props) => {
  const runTests = async () => {
    // Ejecuta Jest bajo demanda
    //const { runCLI } = require('jest');
    //await runCLI({ _: [`${props.folder}myTest.test.js`] }, [process.cwd()]);

  };

  return (
    <button onClick={runTests}>
      Run Tests
    </button>
  );
};

export default TestButton;