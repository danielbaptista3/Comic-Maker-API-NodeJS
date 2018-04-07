const express = require('express');
const accounts = express.Router();
const Account = require('../models').Account;
const AccountController = require('../controllers/accounts');

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

    AccountController.findByMail(req.body.mail)
        .then((account) => {
            res.status(403).end();
        });

    AccountController.create(req.body.mail, req.body.pass)
        .then((account) => {
            res.status(201).json(account);
    }).catch((err) => {
        res.status(500).send(err);
    });
});

module.exports = accounts;