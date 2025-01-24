require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const routes = require('./routes/routes');
const passport = require('passport');
const session = require('express-session');
const { OAuth2Strategy: GoogleStrategy } = require('passport-google-oauth');
const crypto = require('crypto');

const port = process.env.PORT || 3000;

const secret = crypto.randomBytes(64).toString('hex');

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {}
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.use(function(req, res, next) {
    res.status(404).sendFile(path.join(__dirname, '../public/404.html'))
})

app.listen(port, "0.0.0.0", () => {
    console.log(`server is running on ${port}`)
})

module.exports = app;