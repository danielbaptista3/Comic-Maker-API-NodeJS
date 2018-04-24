const express = require('express');
const updates = express.Router();
const fs = require('fs');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: './files/updates',
    filename: function (req, file, cb) {
        cb(null, req.body.version + '.cmp');
    }
})

var upload = multer({
    storage: storage
});

const UpdateController = require('../controllers/updates');

updates.get('/', (req, res) => {
    UpdateController.getAllUpdates()
        .then((updates) => {
            res.status(200).json(updates);
        }).catch((err) => {
            res.status(500).end();
    });
});

updates.get('/versions/:version', (req, res) => {
    if (req.params.version === undefined) {
        res.status(400).end();
        return;
    }

    UpdateController.getVersion(req.params.version)
        .then((update) => {
            if (update === null) {
                res.status(404).end();
            } else {
                res.download('./files/updates/' + update.version + '.cmp', update.version + '.cmp');
            }
        }).catch((err) => {
            res.status(500).end();
    });
});

updates.get('/last', (req, res) => {
    UpdateController.getLast()
        .then((update) => {
            if (update === null) {
                res.status(404).end();
            } else {
                res.download('./files/updates/' + update.version + '.cmp', update.version + '.cmp');
            }
        }).catch((err) => {
            res.status(500).end();
    });
});

updates.post('/', upload.single('update'), (req, res) => {
    const stat = fs.statSync(req.file.path);

    if (stat.mtimeMs === stat.birthtimeMs) {
        UpdateController.add(req.body.version)
            .then((update) => {
                res.status(201).json(update);
            }).catch((err) => {
                res.status(500).end();
        });

        res.status(201).send(req.file);
    } else {
        res.status(400).end();
    }
});

module.exports = updates;
