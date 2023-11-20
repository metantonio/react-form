/** @type {import('jest').Config} */
const config = {
    verbose: true,
  };

test('Example test', () => {
    expect(1 + 1).toBe(2);
  });

export default test;