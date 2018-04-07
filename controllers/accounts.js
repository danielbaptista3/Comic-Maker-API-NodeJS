const Account = require('../models').Account;

const AccountController = {}

AccountController.findAll = function() {
    return Account.findAll();
};

AccountController.findByMail = function(mail) {
    return Account.findOne({
        mail: mail
    });
};

AccountController.create = function(mail, pass) {
    return Account.create({
        mail: mail,
        pass: pass
    });
};

module.exports = AccountController;