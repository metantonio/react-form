/** @type {import('jest').Config} */
const config = {
    verbose: true,
};

let textVariable;
if (!process.argv.find(arg => arg.startsWith('--textVariable='))) {
    console.error('Error: --textVariable argument is missing.');
    process.exit(1); // Exit the process with an error code
  }

describe('Exercise 2: Like Word', () => {
    beforeEach(() => {
        // Antes de cada prueba, configuramos el valor de textVariable
        textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=')[1];
        textVariable = textVariable.slice(1, textVariable.length - 1); // Para quitar los símbolos de porcentaje
    });

    test('Contains opening and closing <p> tags', () => {
        expect(textVariable).toMatch(/<p>.*<\/p>/);
    });

    test('Contains the exact html code', () => {
        expect(textVariable).toBe("<p>HTML tags are similar to MS Word elements</p>");
    });

    /* test('Contains specific text', () => {
        expect(textVariable).toContain("some specific text");
    });

    test('Has a length greater than 5', () => {
        expect(textVariable.length).toBeGreaterThan(5);
    }); */
});

export default describe;