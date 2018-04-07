const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const RouterManager = () => {};

RouterManager.use = function(app) {
    app.use(bodyParser.json());

    app.use('/accounts', require('./accounts'));
    /*app.use('/updates', require('./updates'));
    app.use('/comics', require('./comics'));
    app.use('/plugins', require('./plugins'));
    app.use('/facturation', require('./facturation'));*/
};

module.exports = RouterManager;