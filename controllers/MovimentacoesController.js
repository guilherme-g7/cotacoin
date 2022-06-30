const Dividendo = require("../models/Dividendo");
const Acao = require("../models/Acao");
const Movimentacao = require("../models/Movimentacao");

module.exports = {

    loadMovimentacoes(req, res) {
        Acao.findAll().then((acoes) => {
            Movimentacao.findAll().then((movimentacoes) => {
                res.render("ejs/movimentacoes", {
                    usuario: req.user,
                    movimentacoes: movimentacoes,
                    acoes: acoes
                });
            });
        });
    },

    novaMovimentacao(req, res) {
        Acao.findAll().then((acoes) => {
            res.render("ejs/nova-movimentacao.ejs", {usuario: req.user, acoes: acoes});
        });
    },

    async criaMovimentacao(req, res) {
        console.log(req.body);
        await Movimentacao.create({
            usuario_id: req.body.usuario_id,
            acao_id: req.body.acao_id,
            tipo: req.body.tipo,
            quantidade: req.body.quantidade,
            valor: req.body.valor,

        });
        res.redirect("/movimentacoes");
    },
};