const router = require("express").Router();
const { exec, spawn } = require('child_process');
const path = require('path');

const TUTORIALS_PATH = "../../backend-src/tutorial-unix"

// Manejar las rutas dinámicas
router.get('/:exerciseNumber', (req, res) => {
    console.log(req.params.exerciseNumber)
    const exerciseNumber = req.params.exerciseNumber;
    const exercisePath = `${TUTORIALS_PATH}/exercise${exerciseNumber}.html`;
  
    res.sendFile(path.join(__dirname, exercisePath));
  });


module.exports = router;