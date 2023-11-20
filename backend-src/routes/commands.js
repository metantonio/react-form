const router = require("express").Router();
const { exec, spawn } = require('child_process');
//const openTerminal = require('open-terminal');

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

router.post('/test-1', (req, res) => {
    const { directoryName } = req.body;

    // Ejecutar el proceso cmd.exe con el comando dir en Windows
    const childProcess = spawn('cmd.exe', ['/c', 'jest myTest'], { shell: true });

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
            return res.status(500).json({ error: 'Error al ejecutar el comando' });
        }

        console.log(`Comando ejecutado con éxito:\n${output}`);
        res.status(200).json({ message: 'Exitoso', command: output });
    });
});

module.exports = router;