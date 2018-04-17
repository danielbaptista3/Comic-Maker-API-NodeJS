const Update = require('../models').Update;
const UpdateController = {};

UpdateController.getAllUpdates = () => {
    return Update.findAll();
};

UpdateController.getVersion = (version) => {
    return Update.findOne({
        where: {
            version: version
        }
    });
};

UpdateController.getLast = () => {
    return Update.findOne({
        limit: 1,
        order: [
            ['id', 'DESC']
        ]
    })
};

UpdateController.add = (version) => {
    return Update.create({
        version: version,
        date: new Date()
    });
};

module.exports = UpdateController;