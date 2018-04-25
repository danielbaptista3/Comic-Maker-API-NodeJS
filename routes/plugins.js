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
    PluginController.findByName(req.query.name)
        .then((plugins) => {
            res.status(200).json(plugins);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

plugins.post('/', (req, res) => {
    PluginController.create(req.body.name, req.body.description, req.body.account, req.body.version)
        .then((plugin) => {
            if (plugin == false) {
                res.status(500).end();
            } else {
                res.status(201).json(plugin);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

module.exports = plugins;
