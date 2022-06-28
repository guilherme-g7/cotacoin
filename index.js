const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth")(passport);

const bodyParse = require("body-parser");

const app = express();

global.rootPath = __dirname;
global.path = 'http://localhost:8080/';


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use(
    session({
        secret: "secret",
        cookie: { maxAge: 50 * 60 * 1000 },
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");
app.use(express.static("public"));

authenticationMiddleware = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
};