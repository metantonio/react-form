const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.set('trust proxy', true)
app.use('/backend-src/tutorial-html', express.static(path.join(__dirname, 'ruta_hacia_tus_documentos')));
app.use('/backend-src/tutorial-unix', express.static(path.join(__dirname, 'ruta_hacia_tus_documentos')));
app.use('/backend-src/tutorial-javascript', express.static(path.join(__dirname, 'ruta_hacia_tus_documentos')));
app.use('/backend-src/tutorial-python', express.static(path.join(__dirname, 'ruta_hacia_tus_documentos')));

const commandRouter = require('./backend-src/routes/commands');
app.use('/commands', commandRouter);

const tutorialHtmlRouter = require('./backend-src/routes/tutorial-html');
app.use('/tutorial-html', tutorialHtmlRouter);

const tutorialUnixRouter = require('./backend-src/routes/tutorial-unix');
app.use('/tutorial-unix', tutorialUnixRouter)

const tutorialJavascriptRouter = require('./backend-src/routes/tutorial-javascript');
app.use('/tutorial-javascript', tutorialJavascriptRouter)

const tutorialPythonRouter = require('./backend-src/routes/tutorial-python.js');
app.use('/tutorial-python', tutorialPythonRouter)

app.listen(port, () => {
  console.log(`running server at port: ${port}`);
});
