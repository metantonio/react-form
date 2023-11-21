/** @type {import('jest').Config} */
const config = {
    verbose: true,
};

let textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=')[1];
textVariable = textVariable.slice(1, textVariable.length - 1) //to take out % symbols

test('Exercise 01: Hello World', () => {
    //console.log("dentro de la función de test: ", textVariable)
    expect(textVariable).toBe("<span>Hola <strong>Mundo!</strong></span>");
});

export default test;