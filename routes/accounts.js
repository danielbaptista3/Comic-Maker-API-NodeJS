const express = require('express');
const accounts = express.Router();
const Account = require('../models').Account;
const AccountController = require('../controllers/accounts');
const passport = require('passport');

/*var mail = require('mail').Mail({
    host: 'smtp.localhost',
    username: 'comicmaker',
    password: 'test',
    port: 25
});*/

accounts.get('/', (req, res) => {
    AccountController.findAll()
        .then((accounts) => {
            res.status(200).json(accounts);
    }).catch((err) => {
        res.status(500).send(err);
    })
});

accounts.get('/:mail', (req, res) => {
    AccountController.findByMail(req.params.mail)
        .then((account) => {
            res.status(200).json(account);
        }).catch((err) => {
            res.status(500).send(err);
    });
});

accounts.post('/', (req, res) => {
    if (!req.body.mail && req.body.pass) {
        res.status(400).end();
    }

    AccountController.create(req.body.mail, req.body.pass)
        .then((account) => {
            res.status(201).json(account);
        }).catch((err) => {
            res.status(500).end();
        });
});

accounts.delete('/:mail', (req, res) => {
    AccountController.destroy(req.params.mail)
        .then((account) => {
            res.status(200).json(account);
        }).catch((err) => {
            res.status(500).end();
        });
});

accounts.post('/modifymail/:mail', (req, res) => {
    AccountController.modifyMail(req.params.mail, req.body.mail)
        .then((account) => {
            res.status(200).json(account);
        }).catch((err) => {
            res.status(500).end();
    });
});

accounts.post('/modifypassword/:mail', (req, res) => {
    AccountController.modifyMail(req.params.mail, req.body.pass)
        .then((account) => {
            res.status(200).json(account);
        }).catch((err) => {
        res.status(500).end();
    });
});

/*accounts.get('/sendmail/sendmail', (req, res) => {
    mail.message({
        from: 'comicmaker@127.0.0.1',
        to: ['francois@127.0.0.1'],
        subject: 'Hello from Node.JS'
    }).body('Node speaks SMTP!')
        .send(function(err) {
            res.status(200).send("Send");
        });
});*/



/*accounts.post('/test/:ok', passport.authenticate('local'),
    (err, user, info) => {
    console.log(err);
        req.logIn(user, function(err) {

            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }

            res.status(200).json({
                status: 'Login successful!'
            });

        });
        //res.status(200).send("ok");
    }
);*/

module.exports = accounts;