const express = require('express');
const comics = express.Router();

const ModelIndex = require('../models');
const Comic = ModelIndex.Comic;

const ComicController = require('../controllers/comics');
const AuthorController = require('../controllers/authors');

const multer = require('multer');

var storage = multer.diskStorage({
    destination: './files/comics',
    filename: function (req, file, cb) {
        cb(null, req.body.name + '.cm');
    }
})

var upload = multer({
    storage: storage
});

comics.get('/', (req, res) => {
    ComicController.findAll()
        .then((comics) => {
            res.status(200).json(comics);
        })
        .catch((err) => {
            res.status(500).end();
        })
});

comics.get('/search', (req, res) => {
    ComicController.findByName(req.query.name)
        .then((comics) => {
            res.status(200).json(comics);
        })
        .catch((err) => {
            res.status(500).end();
        });
});

comics.get('/library/:id', (req, res) => {
    if (req.params.id === undefined) {
        res.status(400).end();
        return;
    }

    Comic.findById(parseInt(req.params.id))
        .then((comic) => {
            if (comic === null) {
                res.status(404).end();
            } else {
                res.download('./files/comics/' + comic.name + '.cm', comic.name + '.cmp');
            }
        })
        .catch((err) => {
            res.status(500).end();
        });
});

comics.post('/', upload.single('file'), (req, res) => {
    ComicController.create(req.body.name, req.body.description, req.body.serie, req.body.premium, req.body.account, req.body.price, req.body.authors)
        .then((comic) => {
            if (comic === false) {
                res.status(500).end();
            } else {
                AuthorController.createAll(comic,req.body.authors)
                    .then((authors) => {
                        res.status(201).json(authors);
                    });
                res.status(201).json(comic);
            }
        })
        .catch((err) => {
            res.status(500).send(err);
        });
});

comics.delete('/:id', (req, res) => {
    ComicController.destroy(req.params.id)
        .then((comic) => {
            if (comic) {
                res.status(200).end();
            } else {
                res.status(404).end();
            }
        }).catch((err) => {
            res.status(500).end();
    });
});

comics.put('/mark/:id', (req, res) => {
    if (parseInt(req.body.mark) < 0 || parseInt(req.body.mark) > 5) {
        console.log("pass");
        res.status(500).end();
        return;
    }

    ComicController.mark(req.params.id, parseInt(req.body.mark))
        .then((comic) => {
            res.status(200).json(comic);
        }).catch((err) => {
            res.status(500).end();
    });
});

module.exports = comics;
