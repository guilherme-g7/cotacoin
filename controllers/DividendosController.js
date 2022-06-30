const Dividendo = require("../models/Dividendo");
const Acao = require("../models/Acao");

module.exports = {

    loadDividendos(req, res) {
        Acao.findAll().then((acoes) => {
            Dividendo.findAll().then((dividendos) => {
                Acao.findByPk(dividendos.acao_id).then((acao) => {
                    res.render("ejs/dividendos", { usuario: req.user, acao: acao, dividendos: dividendos , acoes: acoes });
                });

            });
        });
    },

    novoDividendo(req, res) {
        Acao.findAll().then((acoes) => {
            res.render("ejs/novo-dividendo.ejs", { usuario: req.user, acoes: acoes });
        });
    },

    async createDividendos(req, res) {
        console.log(req.body);
        await Dividendo.create({
            usuario_id: req.body.usuario_id,
            acao_id: req.body.acao_id,
            data_compra: req.body.data_compra,
            data_pagamento : req.body.data_pagamento,
            valor: req.body.valor,

        });
        res.redirect("/dividendos");
    },
};