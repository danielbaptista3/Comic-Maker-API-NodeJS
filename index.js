const express = require('express');
const app = express();
const RouterManager = require('./routes');
const ModelIndex = require('./models');

ModelIndex
    .openDatabase()
    .then(() => {
        app.listen(8080, () => {
            console.log('Server started at 8080');
        });

        RouterManager.use(app);
    })
    .catch((err) => {
        console.error(err);
    });