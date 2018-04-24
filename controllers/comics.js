const ModelIndex = require('../models');
const Comic = ModelIndex.Comic;
const Op = ModelIndex.Sequelize.Op;

const SerieController = require('../controllers/series');
const AccountController = require('../controllers/accounts');
const AuthorController = require('../controllers/authors');
const ComicController = {};

ComicController.findAll = () => {
    return Comic.findAll();
};

ComicController.findByName = (name) => {
    return Comic.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            }
        }
    });
};

ComicController.create = (name, description, serie, premium, account, price, authors) => {
    return AccountController.exists(account)
        .then((exists) => {
            if (exists) {
                return SerieController.create(serie)
                    .then((serieO) => {
                        return AccountController.findByMail(account)
                            .then((account) => {
                                return Comic.create({
                                    name: name,
                                    description: description,
                                    serie: serieO.id,
                                    premium: premium,
                                    account: account.id,
                                    price: price
                                });
                            })
                    });
            } else {
                return false;
            }
        });
};

ComicController.destroy = (id) => {
    return Comic.destroy({
        where: {
            id: id
        }
    });
};

ComicController.mark = (id, mark) => {
    return Comic.findById(id)
        .then((comic) => {
            return comic.update({
                markCount: comic.markCount += 1,
                markSum: comic.markSum + mark
            });
        });
};

module.exports = ComicController;
