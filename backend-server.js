const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3002;

app.use(cors());
app.use(express.json());
app.set('trust proxy', true)

const commandRouter = require('./backend-src/routes/commands');
app.use('/commands', commandRouter);

app.listen(port, () => {
  console.log(`running server at port: ${port}`);
});
