const Account = require('../models').Account;

const AccountController = {}

AccountController.findAll = () => {
    return Account.findAll();
};

AccountController.findByMail = (mail) => {
    return Account.findOne({
        where: {
            mail: mail
        }
    });
};

AccountController.create = (mail, pass) => {
    return Account.create({
        mail: mail,
        pass: pass
    });
};

AccountController.destroy = (mail) => {
    return AccountController.findByMail(mail)
        .then((account) => {
            return account.destroy();
        });
};

module.exports = AccountController;
