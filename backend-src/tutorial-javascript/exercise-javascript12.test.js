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

describe('Exercise 12: Simulating Logic Gates', () => {
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

    test('Evaluate nocturneGuard(36, "female") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 36;
        let newGender = "female";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(36, "male") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 36;
        let newGender = "male";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(20, "male") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 20;
        let newGender = "male";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(20, "female") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 20;
        let newGender = "female";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(32, "female") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 32;
        let newGender = "female";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(31, "female") should return true', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 31;
        let newGender = "female";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`true`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(21, "female") should return true', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 21;
        let newGender = "female";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`true`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(24, "male") should return false', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 24;
        let newGender = "male";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`false`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(25, "male") should return true', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 25;
        let newGender = "male";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`true`);
        } catch (error) {
            console.error("Error during code evaluation:", error);
            throw error;
        }
    });

    test('Evaluate nocturneGuard(35, "male") should return true', () => {
        let jsCode = textVariable.replace(/[\n\t\r]+\s*/g, '');
        let newNumber = 35;
        let newGender = "male";
        jsCode = jsCode.replace(
            /console\.log\(nocturneGuard\(\d+, "\w+"\)\);/,
            `console.log(nocturneGuard(${newNumber}, "${newGender}"));`
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
            expect(consoleOutput).toContain(`true`);
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