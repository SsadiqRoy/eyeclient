const path = require('node:path');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('./public'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));

const globalError = require('./utils/globalError');
const clientRoutes = require('./routes/clientRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

app.use('/', clientRoutes);
app.use('/executive', dashboardRoutes);

app.use(globalError);

module.exports = app;
