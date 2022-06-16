const express = require('express');
const server = express();
const winston = require('winston');

require('dotenv').config();
require('./connection/db_connection');
require('./start/logging')();
require('./start/route')(server);


server.listen(process.env.PORT || 4700, () => winston.info(`Server is working on http://localhost:${process.env.PORT || 4700}`));




