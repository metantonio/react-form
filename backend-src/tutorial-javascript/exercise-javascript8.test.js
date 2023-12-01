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

describe('Exercise 07: String Concatenation', () => {
    beforeEach(() => {
        // Antes de cada prueba, configuramos el valor de textVariable
        textVariable = process.argv.find(arg => arg.startsWith('--textVariable=')).split('=').slice(1).join('=');
        //console.log("textVariable0:", textVariable)
        textVariable = textVariable.slice(1, textVariable.length - 1); // Para quitar los símbolos de porcentaje
    });

    //test('Evaluate JavaScript function and its return', () => {        
    //    let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');        
    //    try {         
    //        let result = eval(jsCode)
    //        expect(result).toBe(3);
    //    } catch (error) {
    //        console.error("Error during code evaluation:", error);
    //        throw error;
    //    }
    //});    

    test('Calling specific function isEven(34597)', () => {
        expect(textVariable).toContain("isEven(34597)");
    });

    test('Evaluate isEven(34597)', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        try {
            // capturing the ouput of the console.log
            let consoleOutput = '';
            const originalConsoleLog = console.log;
            console.log = (output) => {
                consoleOutput += output + '\n';
            };

            // run code
            eval(jsCode);

            // Restaurar la función original de console.log
            console.log = originalConsoleLog;

            // Verificar la presencia de console.log en la salida
            expect(consoleOutput).toBe(false);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
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