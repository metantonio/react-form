/** @type {import('jest').Config} */
const config = {
    verbose: true,
};
console.log('exercise 1 html test');
let textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=')[1];
if (!process.argv.find(arg => arg.startsWith('--textVariable='))) {
    console.error('Error: --textVariable argument is missing.');
    process.exit(1); // Exit the process with an error code
  }
  
textVariable = textVariable.slice(1, textVariable.length - 1) //to take out % symbols

test('Exercise 01: Hello World', () => {
    //console.log("dentro de la función de test: ", textVariable)
    expect(textVariable).toMatch(/<span>.*<\/span>/);
    expect(textVariable).toMatch(/<strong>.*<\/strong>/);
    expect(textVariable).toBe("<span>Hola <strong>Mundo!</strong></span>");
});

export default test;