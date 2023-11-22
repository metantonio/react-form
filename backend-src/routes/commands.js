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
    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });

        let output = '';

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

    }

});

//this function is to test the code of the current exercise
router.post('/test/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    let platform = os.platform();

    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)
        let output = '';

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

    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    if (platform === 'win32') {
        let childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
        console.log("comando pedido: ", data)
        let output = '';

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
    //const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    if (platform === 'win32') {
        let childProcess;
        if (data == 'dir' || data == 'ls') {
            childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });
        }
        else if (data === 'ls -l') {
            childProcess = spawn('cmd.exe', ['/c', 'dir /Q'], { shell: true });
        }
        else if (data === 'ls -la') {
            childProcess = spawn('cmd.exe', ['/c', 'dir /A /Q'], { shell: true });
        }
        else if (data == 'pwd' && (lesson==1 || lesson==3)) {
            childProcess = spawn('cmd.exe', ['/c', 'echo %CD%'], { shell: true });
        }
        else if (data == 'cd ./unix' && (lesson==1 || lesson==3)) {
            childProcess = spawn('cmd.exe', ['/c', 'cd ./unix && cd'], { shell: true });
        } else {
            childProcess = spawn('cmd.exe', ['/c', 'dd'], { shell: true });
        }

        let output = '';

        childProcess.stdout.on('data', (data) => {
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

    }

});

module.exports = router;