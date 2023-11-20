const router = require("express").Router();
const { exec } = require('child_process');

router.post('/ls-command', (req, res) => {
    const { directoryName } = req.body;
    //console.log("i'm here")
    // Ejecuta el comando mkdir
    exec(`mkdir hola`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return res.status(500).json({ error: 'error looking in directory' });
      }
  
      console.log(`ls: ${stdout}`);
      res.json({ message: 'succesfully' });
    });
  });

module.exports = router;