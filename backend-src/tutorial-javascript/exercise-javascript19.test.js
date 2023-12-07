/** @type {import('jest').Config} */
const config = {
    verbose: false,
};
//console.log('exercise 1 html test');
let textVariable;
if (!process.argv.find(arg => arg.startsWith('--textVariable='))) {
    console.error('Error: --textVariable argument is missing.');
    process.exit(1); // Exit the process with an error code
}

describe('Exercise 19: Looping Through Arrays with For Loop', () => {
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
    test('Evaluate For Loop', () => {
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
            expect(consoleOutput).toBe(`Matrix is a nice movie!
Toy Story is a nice movie!
The Incredibles is a nice movie!
Ratatouille is a nice movie!
Up is a nice movie!
`);
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

    test('check movies.length', () => {
        expect(textVariable).toContain("movies.length");
    });
    
});

export default describe;