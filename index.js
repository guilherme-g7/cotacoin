const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./auth")(passport);

const bodyParse = require("body-parser");
const UsuarioController = require("./controllers/UsuarioController");

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

app.get("/login", UsuarioController.loadLogin);
app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login?fail=true",
    })
);
app.get("/logout", (req, res) => {
    req.logOut((err) => {
        console.log(err);
    });
    res.redirect("/");
});

app.get("/", authenticationMiddleware, (req, res) => {
    UsuarioController.loadIndex(req, res);
});


app.get("*", (req, res) => {
    res.sendFile(global.rootPath + "/views/html/404.html", 404);
});

const server = app.listen(8080, function () {
    console.log("Servidor rodando na porta 8080");
    console.log("Running");
});

module.exports = server;