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

AccountController.modifyMail = (mail1, mail2) => {
    return AccountController.findByMail(mail1)
        .then((account) => {
            return account.update({
                mail: mail2
            })
        });
};

AccountController.modifyPassword = (mail, pass) => {
    return AccountController.findByMail(mail1)
        .then((account) => {
            return account.update({
                pass: pass
            })
        });
};

module.exports = AccountController;
