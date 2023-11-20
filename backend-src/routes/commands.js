const router = require("express").Router();
const { exec } = require('child_process');

router.post('/ls-command', (req, res) => {
    const { directoryName } = req.body;
    //console.log("i'm here")
    // Ejecuta el comando mkdir
    exec(`dir`, (error, stdout, stderr) => { //en windowd es dir, en otro sería ls -l
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'error looking in directory' });
        }

        //console.log(`ls: ${stdout}`);
        res.status(200).json({ message: 'succesfully', command: stdout });
    });
});

router.post('/test-1', (req, res) => {
    const { directoryName } = req.body;
    //console.log("i'm here")
    // Ejecuta el comando mkdir
    exec(`jest myTest`, (error, stdout, stderr) => { //en windowd es dir, en otro sería ls -l
        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'error in testing' });
        }

        console.log(`jest: ${stdout}`);
        return res.status(200).json({ message: 'succesfully testes', command: stdout });
    });
});

module.exports = router;