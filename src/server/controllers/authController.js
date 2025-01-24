require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/api/auth/google/callback`,
    },
    function (token, tokenSecret, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

exports.login = passport.authenticate('google', {
    scope: ['profile', 'email']
}
);

exports.callback = [
    passport.authenticate('google', { failureRedirect: '/'}),
    (req, res) => {
        res.redirect('/admin');
    }
];

exports.logout = (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout(err => {
            if (err) {
                return next(err);
            }
            res.redirect('/'); 
        });
    } else {
        res.redirect('/');
    }
};
