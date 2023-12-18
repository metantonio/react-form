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

describe('Exercise 20: Nested For Loops', () => {
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
            expect(consoleOutput).toBe(`Matrix is an old movie and i like it
Matrix is an old movie and is not for me
Matrix is an old movie and may be you like it
Matrix is a new movie and i like it
Matrix is a new movie and is not for me
Matrix is a new movie and may be you like it
Matrix is a retro movie and i like it
Matrix is a retro movie and is not for me
Matrix is a retro movie and may be you like it
Toy Story is an old movie and i like it
Toy Story is an old movie and is not for me
Toy Story is an old movie and may be you like it
Toy Story is a new movie and i like it
Toy Story is a new movie and is not for me
Toy Story is a new movie and may be you like it
Toy Story is a retro movie and i like it
Toy Story is a retro movie and is not for me
Toy Story is a retro movie and may be you like it
The Incredibles is an old movie and i like it
The Incredibles is an old movie and is not for me
The Incredibles is an old movie and may be you like it
The Incredibles is a new movie and i like it
The Incredibles is a new movie and is not for me
The Incredibles is a new movie and may be you like it
The Incredibles is a retro movie and i like it
The Incredibles is a retro movie and is not for me
The Incredibles is a retro movie and may be you like it
Up is an old movie and i like it
Up is an old movie and is not for me
Up is an old movie and may be you like it
Up is a new movie and i like it
Up is a new movie and is not for me
Up is a new movie and may be you like it
Up is a retro movie and i like it
Up is a retro movie and is not for me
Up is a retro movie and may be you like it
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

    test('check description.length', () => {
        expect(textVariable).toContain("description.length");
    });

    test('check finish.length', () => {
        expect(textVariable).toContain("finish.length");
    });
    
});

export default describe;

