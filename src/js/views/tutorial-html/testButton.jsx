import React from 'react';
import { runCLI } from 'jest';

const TestButton = (props) => {
  const runTests = async () => {
    // Ejecuta Jest bajo demanda
    await runCLI({ _: [`${props.folder}myTest.test.js`] }, [process.cwd()]);
  };

  return (
    <button onClick={runTests}>
      Run Tests
    </button>
  );
};

export default TestButton;