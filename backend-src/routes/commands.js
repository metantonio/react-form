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
        else if (data === 'pwd' && lesson == 6) {
            childProcess = spawn('pwd', [], { shell: true, cwd: "./unix/home/user1" });
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
            }else{
                correcto = false
            }        
        }
        else if (commandParts[0] === 'find' && lesson == 8) {
            let resto = commandParts.slice(1)
            childProcess = spawn('find', resto, { shell: true, cwd: "./unix/home/user1" });
            if (data == 'find ./ -type f -name "*.txt" | grep "important"' || data == 'find . -type f -name "*.txt" | grep "important"') {
                correcto = true
            }else{
                correcto = false
            }        
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

});

module.exports = router;