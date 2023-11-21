const router = require("express").Router();
const { exec, spawn } = require('child_process');
//const openTerminal = require('open-terminal');
const path = require('path');

const TUTORIALS_PATH = "../../backend-src/tutorial-html"

router.post('/ls-command', (req, res) => {
    const { directoryName } = req.body;

    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    const childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });

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
            return res.status(500).json({ error: 'Error al ejecutar el comando' });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });
});

//this function is to test the code of the current exercise
router.post('/test/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    const childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
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
            return res.status(200).json({ command: output, message: "Error" });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });
});

router.post('/unix/:exerciseNumber', (req, res) => {
    const { data } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    const childProcess = spawn('cmd.exe', ['/c', `jest --runInBand exercise${exerciseNumber} --textVariable="%${data.toString()}%"`], { shell: true });
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
            return res.status(200).json({ command: output, message: "Error" });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });
});

router.post('/unix-commands', (req, res) => {
    let { data } = req.body;
    //const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    let childProcess;
    if (data == 'dir' || data=='ls') {
        childProcess = spawn('cmd.exe', ['/c', 'dir'], { shell: true });
    }
    if (data == 'pwd') {
        childProcess = spawn('cmd.exe', ['/c', 'echo %CD%'], { shell: true });
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
            return res.status(500).json({ error: 'Error al ejecutar el comando' });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });

});

module.exports = router;