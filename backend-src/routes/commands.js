const router = require("express").Router();
const { exec, spawn } = require('child_process');
//const openTerminal = require('open-terminal');
const path = require('path');
const os = require('os');

const TUTORIALS_PATH = "../../backend-src/tutorial-html"

router.post('/ls-command', (req, res) => {
    let { directoryName } = req.body;
    let platform = os.platform();
    console.log(platform)
    let output = '';
    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });



        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(500).json({ error: 'Error al ejecutar el comando', correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });

    } else {
        let childProcess;
        console.log("distinto de windows")
        childProcess = spawn('ls', ['-l']);
        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(500).json({ error: 'Error al ejecutar el comando', correct: false, message: "error" });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });

    }

});

//this function is to test the code of the current exercise
router.post('/test/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    let platform = os.platform();
    let output = '';
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise-html${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });
    } else {
        let childProcess = spawn('npx', ['jest', `exercise-html${exerciseNumber}.test.js`, '--', `--textVariable="${data.toString()}"`], { cwd: "./" });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });
    }

});

router.post('/test-javascript/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    let platform = os.platform();
    let output = '';
    let tutorialType = 'javascript';
    console.log("testing exercise number ", exerciseNumber)
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise-${tutorialType}${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });
    } else {
        let childProcess = spawn('npx', ['jest', `exercise-${tutorialType}${exerciseNumber}.test.js`, '--', `--textVariable="${data.toString()}"`], { cwd: "./backend-src/tutorial-javascript/" });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }
            let dividedMessage = output.split("https://jestjs.io/docs/configuration")
            console.log("dividesMessage.length = ", dividedMessage.length)
            console.log(`Comando ejecutado con éxito:\n${output}`);
            if (dividedMessage.length >= 1) {
                res.status(200).json({ message: 'Exitoso', command: dividedMessage[dividedMessage.length - 1], correct: true });
            } else {
                res.status(200).json({ message: 'Exitoso', command: output, correct: true });
            }

        });
    }

});

router.post('/unix/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    let platform = os.platform();
    let output = '';
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });
    }

});

router.post('/unix-commands', (req, res) => {
    let { data, lesson } = req.body;
    let platform = os.platform();
    let output = '';
    //const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    if (platform === 'win32') {
        let childProcess;
        if ((data == 'dir' || data == 'ls') && lesson < 4) {
            childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });
        }
        else if (data === 'ls -l' && lesson < 4) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /Q'], { shell: true });
        }
        else if (data === 'ls -la' && lesson < 4) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /A /Q'], { shell: true });
        }
        else if (data == 'pwd' && (lesson == 1 || lesson == 3)) {
            childProcess = spawn('cmd.exe', ['/c', 'echo %CD%'], { shell: true });
        }
        else if (data == 'cd ./unix' && (lesson == 3)) {
            childProcess = spawn('cmd.exe', ['/c', 'cd'], { shell: true, detached: false, cwd: "./unix" });
        }
        else if (data == 'pwd' && (lesson == 4)) {
            childProcess = spawn('cmd.exe', ['/c', 'echo %CD%'], { shell: true, detached: false, cwd: "./unix" });
        }
        else if (data == 'cd ./home/user1' && (lesson == 4)) {
            childProcess = spawn('cmd.exe', ['/c', 'cd'], { shell: true, detached: false, cwd: "./unix/home/user1" });
        }
        else if (data === 'ls -l' && lesson == 4) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /Q'], { shell: true, cwd: "./unix" });
        }
        else if (data === 'ls -la' && lesson == 4) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /A /Q'], { shell: true, cwd: "./unix" });
        }
        else if (data == 'pwd' && (lesson == 5)) {
            childProcess = spawn('cmd.exe', ['/c', 'echo %CD%'], { shell: true, detached: false, cwd: "./unix/home/user1" });
        }
        else if (data === 'ls -l' && lesson == 5) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /Q'], { shell: true, cwd: "./unix/home/user1" });
        }
        else if (data === 'ls -la' && lesson == 5) {
            childProcess = spawn('cmd.exe', ['/c', 'dir /A /Q'], { shell: true, cwd: "./unix/home/user1" });
        }
        else if ((data == 'cp hello.txt ../user2/HelloCopy.txt' || data == 'cp ./hello.txt ../user2/HelloCopy.txt') && lesson == 5) {
            let origen = '.\\hello.txt';
            let destino = '..\\user2\\HelloCopy.txt';
            childProcess = spawn('cmd.exe', ['/c', `copy ${origen} ${destino}`], { shell: true, cwd: "./unix/home/user1" });
        } else {
            childProcess = spawn('cmd.exe', ['/c', 'dd'], { shell: true });
        }



        childProcess.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error: ${data}`);
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(500).json({ error: 'Error al ejecutar el comando', correct: false, message: "error" });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });

    } else {
        try {
            let childProcess;
            console.log("distinto de windows")
            console.log("data: ", data)
            let commandParts = data.split(' ');
            let correcto = true
            if ((data == 'pwd' && lesson <= 4)) {
                childProcess = spawn('pwd', []);
            }
            else if ((data == 'ls') && lesson < 4) {
                childProcess = spawn('ls', []);
            }
            else if ((data == 'ls -l') && lesson < 4) {
                childProcess = spawn('ls', ['-l']);
            }
            else if ((data == 'ls -la' || data == 'ls -l -a') && lesson < 4) {
                childProcess = spawn('ls', ['-la']);
            }
            else if (commandParts[0] === 'cd' && lesson < 4) {
                childProcess = spawn('cd', [commandParts[1]]);
            }
            else if (data === 'cd ./home/user1' && lesson == 4) {
                childProcess = spawn('pwd', [commandParts[1]], { shell: true, cwd: "./unix/home/user1" });
            }
            else if (commandParts[0] === 'ls' && lesson == 4) {
                childProcess = spawn('ls', [commandParts[1]], { shell: true, cwd: "./unix" });
            }
            else if (data === 'pwd' && lesson == 5) {
                childProcess = spawn('pwd', [], { shell: true, cwd: "./unix/home/user1" });
            }
            else if (commandParts[0] === 'ls' && lesson == 5) {
                childProcess = spawn('ls', [commandParts[1]], { shell: true, cwd: "./unix/home/user1" });
            }
            else if (data === 'pwd' && lesson >= 6 && lesson <= 8) {
                childProcess = spawn('pwd', [], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (commandParts[0] === 'ls' && lesson == 6 && commandParts[1] !== '-R') {
                childProcess = spawn('ls', [commandParts[1]], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (commandParts[0] === 'ls' && lesson == 6 && commandParts[1] === '-R') {
                childProcess = spawn('ls', [commandParts[1]], { shell: true, cwd: "./unix/home/user1" });
                correcto = true
            }
            else if (commandParts[0] === 'ls' && lesson > 6) {
                childProcess = spawn('ls', [commandParts[1]], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if ((data == 'cp hello.txt ../user2/HelloCopy.txt' || data == 'cp ./hello.txt ../user2/HelloCopy.txt') && lesson == 5) {
                let origen = './hello.txt';
                let destino = '../user2/HelloCopy.txt';
                childProcess = spawn(`cp ${origen} ${destino}`, [], { shell: true, cwd: "./unix/home/user1" });
            }
            else if (commandParts[0] === 'find' && lesson == 7) {
                let resto = commandParts.slice(1)
                childProcess = spawn('find', resto, { shell: true, cwd: "./unix/home/user1" });
                if (data == 'find ./ -type f -name "*.js"' || data == 'find . -type f -name "*.js"') {
                    correcto = true
                } else {
                    correcto = false
                }
            }
            else if (commandParts[0] === 'man') {
                let resto = commandParts.slice(1)
                childProcess = spawn('man', resto, { shell: true, cwd: "./unix/home/user1" });
                if (lesson === 12 && resto[0]=="ls" ) {
                    correcto = true
                } else {
                    correcto = false
                }
            }
            else if (commandParts[0] === 'date') {
                let resto = commandParts.slice(1)
                childProcess = spawn('date', resto, { shell: true, cwd: "./unix/home/user1" });
                if (lesson === 13 && resto[0]=="-R") {
                    correcto = true
                } else {
                    correcto = false
                }
            }
            else if (data === 'ls -l; cat hello.txt' && lesson==14) {
                let resto = commandParts.slice(1)
                childProcess = spawn('la', ["-l; cat hello.txt"], { shell: true, cwd: "./unix/home/user1" });
                if (lesson === 14) {
                    correcto = true
                } else {
                    correcto = false
                }
            }
            else if (commandParts[0] === 'find' && (lesson == 8 || lesson == 11)) {
                let resto = commandParts.slice(1)
                childProcess = spawn('find', resto, { shell: true, cwd: "./unix/home/user1" });
                if (data == 'find ./ -type f -name "*.txt" | grep "secret"' || data == 'find . -type f -name "*.txt" | grep "secret"') {
                    correcto = true
                } else {
                    correcto = false
                }
            }
            else if (commandParts[0] === 'ls' && lesson >= 8) {
                let resto = commandParts.slice(1)
                childProcess = spawn('ls', resto, { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (data === 'mkdir ../user2/QLX' && lesson == 9) {
                let resto = commandParts.slice(1)
                childProcess = spawn('rm', ["-r QLX"], { shell: true, cwd: "./unix/home/user2" });
                childProcess = spawn('mkdir', ["QLX"], { shell: true, cwd: "./unix/home/user2" });
                correcto = true
            }
            else if (data === 'mkdir --help') {
                let resto = commandParts.slice(1)
                childProcess = spawn('mkdir', ["--help"], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (data === 'cat --help') {
                let resto = commandParts.slice(1)
                childProcess = spawn('cat', ["--help"], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (data === 'less --help') {
                let resto = commandParts.slice(1)
                childProcess = spawn('less', ["--help"], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (data === 'rm --help') {
                let resto = commandParts.slice(1)
                childProcess = spawn('rm', ["--help"], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (commandParts[0] === 'ls' && lesson >= 10) {
                let resto = commandParts.slice(1)
                childProcess = spawn('ls', resto, { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (commandParts[0] === 'pwd' && lesson >= 10) {
                let resto = commandParts.slice(1)
                childProcess = spawn('pwd', [], { shell: true, cwd: "./unix/home/user1" });
                correcto = false
            }
            else if (data === 'rm -r ../user2/QLX' && lesson == 10) {
                let resto = commandParts.slice(1)
                childProcess = spawn('mkdir', ["QLX"], { shell: true, cwd: "./unix/home/user2" });
                childProcess = spawn('rm', ["-r QLX"], { shell: true, cwd: "./unix/home/user2" });
                correcto = true
            }
            else if (data === 'cat "./documents/more documents/not important documents/jokes.txt"' && lesson == 11) {
                let resto = commandParts.slice(1)
                childProcess = spawn('cat', ['"./documents/more documents/not important documents/jokes.txt"'], { shell: true, cwd: "./unix/home/user1" });
                correcto = true
            }
            else if (data === 'less "./documents/more documents/not important documents/jokes.txt"' && lesson == 11) {
                let resto = commandParts.slice(1)
                childProcess = spawn('less', ['"./documents/more documents/not important documents/jokes.txt"'], { shell: true, cwd: "./unix/home/user1" });
                correcto = true
            }
            else {
                childProcess = spawn(`echo Wrong Command: ${data}`, [], { shell: true });
                correcto = false
            }
            childProcess.stdout.on('data', (data) => {
                console.log(`stdout: ${data}`);
                output += data.toString();
            });

            childProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
            });

            childProcess.on('close', (code) => {
                if (code !== 0) {
                    console.error(`Error: Proceso hijo cerrado con código ${code}`);
                    return res.status(500).json({ error: 'Error al ejecutar el comando', correct: false, message: "error" });
                }

                console.log(`Comando ejecutado con éxito:\n${output}`);
                res.status(200).json({ message: 'Exitoso', command: output, correct: correcto });
            });
        }
        catch (err) {
            console.log(err)
        }


    }

});

function unitTestPython(outputTerminal, exercise, code=null) {
    let messageOutput = { message: "Error", correct: false }
    //console.log("unitestPython", exercise)
    switch (exercise) {
        case "1":
            //console.log("terminal:", outputTerminal)
            if (outputTerminal.includes("Hello World")) { //terminar comes with an extra space
                messageOutput = { message: "Correct", correct: true }
            }
            break;
        case "2":
            //console.log("terminal:", outputTerminal)
            if (code.includes("print(message)") && outputTerminal.includes("I like programming")) { //terminar comes with an extra space
                messageOutput = { message: "Correct", correct: true }
            }
            break;
        case "3":
            //console.log("terminal:", outputTerminal)
            if (code.includes("print(easyCalculation)") && outputTerminal.includes("14496")) { //terminar comes with an extra space
                messageOutput = { message: "Correct", correct: true }
            }
            break;
        case "4":
            //console.log("terminal:", outputTerminal)
            if (code.includes("print(age)") && code.includes("+") && code.includes("35")) { //terminar comes with an extra space
                messageOutput = { message: "Correct", correct: true }
            }
            break;
        default:
            return messageOutput;
            break;
    }
    return messageOutput;
}

function validatePythonCode(pythonCode){
    if(pythonCode.includes("os.system")){
        return false
    }
    if(pythonCode.includes("rm -rf")){
        return false
    }
    if(pythonCode.includes("eval")){
        return false
    }
    if(pythonCode.includes("/etc/passwd")){
        return false
    }
    if(pythonCode.includes("with open")){
        return false
    }
    if(pythonCode.includes("requests.get")){
        return false
    }
    if(pythonCode.includes("requests")){
        return false
    }
    if(pythonCode.includes("while True")){
        return false
    }
    if(pythonCode.includes("while False")){
        return false
    }
    if(pythonCode.includes("re.compile")){
        return false
    }
    if(pythonCode.includes("os.remove")){
        return false
    }
    if(pythonCode.includes("git remote")){
        return false
    }
    if(pythonCode.includes("git add")){
        return false
    }
    if(pythonCode.includes("git push")){
        return false
    }
    if(pythonCode.includes("git pull")){
        return false
    }
    if(pythonCode.includes("git commit")){
        return false
    }
    if(pythonCode.includes("'A' * 1000000")){
        return false
    }
    if(pythonCode.includes("range(1000000)")){
        return false
    }
    if(pythonCode.includes("builtins")){
        return false
    }
    if(pythonCode.includes("__import__")){
        return false
    }
    if(pythonCode.includes("time.sleep")){
        return false
    }
    if(pythonCode.includes("os.makedirs")){
        return false
    }
    if(pythonCode.includes("psycopg2")){
        return false
    }
    if(pythonCode.includes("database")){
        return false
    }
    if(pythonCode.includes("host")){
        return false
    }
    if(pythonCode.includes("localhost")){
        return false
    }
    if(pythonCode.includes("port")){
        return false
    }
    if(pythonCode.includes("os.environ")){
        return false
    }
    if(pythonCode.includes("os.listdir")){
        return false
    }
    if(pythonCode.includes("os.path")){
        return false
    }
    if(pythonCode.includes("glob.")){
        return false
    }
    if(pythonCode.includes(".read()")){
        return false
    }
    if(pythonCode.includes("pip install")){
        return false
    }
    if(pythonCode.includes("pip3 install")){
        return false
    }
    if(pythonCode.includes("pip uninstall")){
        return false
    }
    if(pythonCode.includes("pip3 uninstall")){
        return false
    }
    if(pythonCode.includes("pipenv")){
        return false
    }
    if(pythonCode.includes("input(")){
        return false
    }
    return true
}

router.post('/test-python/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    let platform = os.platform();
    let output = '';
    let tutorialType = 'python';
    console.log("testing exercise number ", exerciseNumber)
    let validation = validatePythonCode(data)
    if(validation===false){
        console.log("Hey! what are you trying to do?")
        return res.status(200).json({ message: "Hey! what are you trying to do?", command: "Hey! what are you trying to do?? :/   The code is not valid!", correct: false });
    }
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise-${tutorialType}${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }

            console.log(`Comando ejecutado con éxito:\n${output}`);
            res.status(200).json({ message: 'Exitoso', command: output, correct: true });
        });
    } else {
        console.log("comando pedido: ", data)
        let childProcess = spawn('python3', ['-c', data], { cwd: "./backend-src/tutorial-python/" });


        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(`Error donde esta: ${data}`);
            output += data.toString();
        });

        childProcess.on('close', (code) => {
            if (code !== 0) {
                console.error(`Error: Proceso hijo cerrado con código ${code}`);
                return res.status(200).json({ command: output, message: "Error", correct: false });
            }
            let dividedMessage = output.split("https://jestjs.io/docs/configuration")
            console.log("dividesMessage.length = ", dividedMessage.length)
            //console.log(`Comando ejecutado con éxito:\n${output}`);

            if (dividedMessage.length >= 1) {
                let result = unitTestPython(dividedMessage[dividedMessage.length - 1], exerciseNumber, data)
                res.status(200).json({ message: result.message, command: dividedMessage[dividedMessage.length - 1], correct: result.correct });
            } else {
                let result = unitTestPython(output, exerciseNumber, data)
                res.status(200).json({ message: result.message, command: output, correct: result.correct });
            }

        });
    }

});


module.exports = router;