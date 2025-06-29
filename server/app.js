// express setup
if(process.env.NODE_ENV !== "development") {
    require('dotenv').config()
}
const express = require('express');
const cors = require('cors');
const app = express();
const errorHandler = require('./middlewares/errorHandler.js');
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
const routes = require('./routers/index.js');

app.use('/', routes);
app.use(errorHandler)

module.exports = app;