const express = require('express');
const plugins = express.Router();

const PluginController = require('../controllers/plugins');

plugins.get('/', (req, res) => {
    PluginController.findAll()
        .then((plugins) => {
            res.status(200).json(plugins);
        })
        .catch((err) => {
            res.status(500).end();
        })
});

plugins.get('/search', (req, res) => {

});

plugins.post('/', (req, res) => {
});

module.exports = router;
