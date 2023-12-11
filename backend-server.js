const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');

const app = express();
const port = 3002;

const process = require('node:process') //Para manejar promesas en loops que han sido rechazadas
require('events').EventEmitter.prototype._maxListeners = 70;
require('events').defaultMaxListeners = 70;

app.use(cors());
app.use(express.json());
app.set('trust proxy', true)
app.use('/backend-src/tutorial-html', express.static(path.join(__dirname, 'tutorial-html')));
app.use('/backend-src/tutorial-unix', express.static(path.join(__dirname, 'tutorial-unix')));
app.use('/backend-src/tutorial-javascript', express.static(path.join(__dirname, 'tutorial-javascript')));
app.use('/backend-src/tutorial-python', express.static(path.join(__dirname, 'tutorial-python')));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb', extended: true}));

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

process.on('warning', function (err) {
  if ('MaxListenersExceededWarning' == err.name) {
    console.log('Excedeed number of listener');
    // write to log function
    process.exit(1); // its up to you what then in my case script was hang

  }
});

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
