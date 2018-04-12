const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy({
        usernameField: "mail",
        passwordField: "pass"
    },
    function(mail, pass, done) {
        Account.findOne({ mail: mail }, function (err, account) {
            /*if (err) {
                return done(err);
            }
            if (!account) {
                return done(null, false);
            }
            if (!account.verifyPassword(pass)) {
                return done(null, false);
            }*/

            return done(null, account);
        });
    }
));

passport.serializeUser(function(user, done) {
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

const RouterManager = () => {};

RouterManager.use = function(app) {
    app.use(bodyParser.json());

    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/accounts', require('./accounts'));
    /*app.use('/updates', require('./updates'));
    app.use('/comics', require('./comics'));
    app.use('/plugins', require('./plugins'));
    app.use('/facturation', require('./facturation'));*/
};

module.exports = RouterManager;
