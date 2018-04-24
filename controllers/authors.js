const ModelIndex = require('../models');
const Author = ModelIndex.Author;
const Comic = ModelIndex.Comic;

const AuthorController = {};

AuthorController.create = (name) => {
    AuthorController.exists(name)
        .then((exists) => {
            if (exists) {
                return AuthorController.findByName(name);
            } else {
                return Author.create({
                   name: name
                });
            }
        })
}

AuthorController.createAll = (comic, authors) => {
    var promises = [];

    for (var author of authors) {
        promises.push(AuthorController.create(author));
    }

    return Promise.all(promises);
}

AuthorController.addToComic = (comic, author) => {
//    AuthorController.
}

AuthorController.exists = (name) => {
    return AuthorController.exists(name)
        .then((author) => {
            return author !== null;
        });
}

AuthorController.findByName = (name) => {
    return Author.findOne({
        name: name
    });
}

module.exports = AuthorController;
