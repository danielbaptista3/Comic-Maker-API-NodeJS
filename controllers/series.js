const ModelIndex = require('../models');
const Serie = ModelIndex.Serie;

const SerieController = {};

SerieController.create = (name) => {
    return SerieController.exists(name)
        .then((exists) => {
            if (exists) {
                return SerieController.findByName(name);
            } else {
                return Serie.create({
                    name: name
                });
            }
        });
};

SerieController.exists = (name) => {
    return SerieController.findByName(name)
        .then((serie) => {
            return serie !== null;
        });
}

SerieController.findByName = (name) => {
    return Serie.findOne({
        where: {
            name: name
        }
    });
}

module.exports = SerieController;
