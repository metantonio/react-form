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

const commandRouter = require('./backend-src/routes/commands');
app.use('/commands', commandRouter);

const tutorialHtmlRouter = require('./backend-src/routes/tutorial-html');
app.use('/tutorial-html', tutorialHtmlRouter);

app.listen(port, () => {
  console.log(`running server at port: ${port}`);
});
