// express setup
const express = require('express');
const cors = require('cors');
const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors());
const routes = require('./routers/index.js');

app.use('/', routes);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = app;