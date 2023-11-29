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

describe('Exercise 01: The Console', () => {
    beforeEach(() => {
        // Antes de cada prueba, configuramos el valor de textVariable
        textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=')[1];
        textVariable = textVariable.slice(1, textVariable.length - 1); // Para quitar los símbolos de porcentaje
    });

    test('Evaluate JavaScript code for printing function', () => {
        const jsCode = `
            const printing = () => {
                let a = 1;
                let b = 2;
                return a + b;
            };
            printing();
        `;

        const func = new Function(jsCode);
        const result = func();

        expect(result).toBe(3);
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