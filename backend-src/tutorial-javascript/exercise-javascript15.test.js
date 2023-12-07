/** @type {import('jest').Config} */
const config = {
    verbose: true,
};
//console.log('exercise 1 html test');
let textVariable;
if (!process.argv.find(arg => arg.startsWith('--textVariable='))) {
    console.error('Error: --textVariable argument is missing.');
    process.exit(1); // Exit the process with an error code
}

describe('Exercise 15: Random Numbers and Switch(true)', () => {
    beforeEach(() => {
        // Antes de cada prueba, configuramos el valor de textVariable
        textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=').slice(1).join('=');
        //console.log("textVariable0:", textVariable)
        textVariable = textVariable.slice(1, textVariable.length - 1); // Para quitar los símbolos de porcentaje
    });

    test('Contains Math.floor', () => {
        expect(textVariable).toContain("Math.floor");
    });

    test('Contains Math.random', () => {
        expect(textVariable).toContain("Math.random");
    });

    /* test('Contains opening and closing <strong> tags', () => {
        expect(textVariable).toMatch(/<strong>.*<\/strong>/);
    });

    test('Contains the exact html code', () => {
        expect(textVariable).toBe("<span>Hola <strong>Mundo!</strong></span>");
    }); */

    /* test('Contains specific text', () => {
        expect(textVariable).toContain("some specific text");
    });

    test('Has a length greater than 5', () => {
        expect(textVariable.length).toBeGreaterThan(5);
    }); */
});

export default describe;