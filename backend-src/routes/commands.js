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

router.post('/test/:exerciseNumber', (req, res) => {
    const { obj } = req.body;
    const exerciseNumber = req.params.exerciseNumber;
    // Ejecutar el proceso cmd.exe con el comando jest en Windows
    const childProcess = spawn('cmd.exe', ['/c', `jest exercise${exerciseNumber}`], { shell: true });
    console.log("comando pedido: ", obj)
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
            return res.status(500).json({ command: 'Error al ejecutar el comando', message:"Error" });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });
});

module.exports = router;