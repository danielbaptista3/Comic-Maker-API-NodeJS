const express = require('express');
const accounts = express.Router();

accounts.get('/', (req, res) => {
    res.status(200).send('Lister les comptes');
});

accounts.get('/:mail', (req, res) => {
   res.status(200).send(`Voir le compte ${req.params.mail}`);
});

accounts.post('/', (req, res) => {
    res.status(201).send('Créer un compte');
});

accounts.put('/:mail', (req, res) => {
    res.status(201).send(`Modifier le compte ${req.params.mail}`);
});

accounts.delete('/:mail', (req, res) => {
    res.status(200).send(`Supprimer le compte ${req.params.mail}`);
});

module.exports = accounts;