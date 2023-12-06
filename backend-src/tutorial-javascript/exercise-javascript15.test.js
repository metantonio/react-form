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

describe('Exercise 14: Switch(true)', () => {
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

    test('Evaluate pointSytems(90) should return "critical"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 90;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`critical`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(70) should return "nice"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 70;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`nice`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(50) should return "good"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 50;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`good`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(30) should return "soft"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 30;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`soft`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(1) should return "bad"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 1;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`bad`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(0) should return "miss"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 0;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`miss`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate pointSytems(2) should return "bad"', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 2;
        jsCode = jsCode.replace(
            /console\.log\(pointSytems\(\d+\)\);/g,
            `console.log(pointSytems(${newNumber}));`
        );
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
            expect(consoleOutput).toContain(`bad`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
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