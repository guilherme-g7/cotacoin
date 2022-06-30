const express = require("express");
const http = require("http");
const url = require("url");

const session = require("express-session");
const passport = require("passport");
require("./auth")(passport);

const bodyParse = require("body-parser");
const db = require("./db");


const UsuarioController = require("./controllers/UsuarioController");
const AcoesController = require("./controllers/AcoesController");
const DividendosController = require("./controllers/DividendosController");
const MovimentacoesController = require("./controllers/MovimentacoesController");

const app = express();

global.rootPath = __dirname;
global.path = 'http://localhost:8080/';


app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: false }));

app.use(
    session({
        secret: "nosso-segredo",
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

app.get("/acoes", authenticationMiddleware, (req, res) => {
    AcoesController.loadAcoes(req, res);
});

app.post("/acoes", authenticationMiddleware, (req, res) => {
    AcoesController.criaAcao(req, res);
});

app.get("/nova-acao", authenticationMiddleware, (req, res) => {
    AcoesController.novaAcao(req, res);
});

app.get("/deleta-acao/:acao_id", authenticationMiddleware, (req, res) => {
    AcoesController.deleteAcao(req, res);
});


app.get("/dividendos", authenticationMiddleware, (req, res) => {
    DividendosController.loadDividendos(req, res);
});
app.post("/dividendos", authenticationMiddleware, (req, res) => {
    DividendosController.createDividendos(req, res);
});

app.get("/movimentacoes", authenticationMiddleware, (req, res) => {
    MovimentacoesController.loadMovimentacao(req, res);
});

app.post("/movimentacoes", authenticationMiddleware, (req, res) => {
    MovimentacoesController.createMovimentacao(req, res);
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