const ModelIndex = require('../models');
const Plugin = ModelIndex.Plugin;
const Op = ModelIndex.Sequelize.Op;

const AccountController = require('../controllers/accounts');
const PluginController = {};

const multer = require('multer');

var storage = multer.diskStorage({
    destination: './files/plugins',
    filename: function (req, file, cb) {
        cb(null, req.body.name + '.cmp');
    }
})

var upload = multer({
    storage: storage
});

PluginController.findAll = () => {
    return Plugin.findAll();
}

PluginController.findByName = (name) => {
    return PluginController.findAll({
        where: {
            name: {
                [Op.like]: '%' + name + '%'
            }
        }
    })
};

PluginController.create = (name, description, account, version) => {
    return AccountController.exists(account)
        .then((exists) => {
            if (exists) {
                return AccountController.findByMail(account)
                    .then((account) => {
                        return Plugin.create({
                            name: name,
                            description: description,
                            account: account.id,
                            version: version,
                        });
                    });
            } else {
                return false;
            }
        });
};

module.exports = PluginController;