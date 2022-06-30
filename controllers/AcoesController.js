const Acao = require("../models/Acao");
module.exports = {

    async loadAcoes(req, res) {
        await Acao.findAll().then((data) => {
            console.log(data);
            res.render("ejs/acoes", { acoes: data });
        });
    },

    novaAcao(req, res) {
        res.render("ejs/nova-acao");
    },


    async criaAcao(req, res) {
        await Acao.create({
            tipo: req.body.tipo,
            codigo: req.body.codigo,
            setor : req.body.setor,
        });
        res.redirect("/acoes");
    },

    async deleteAcao(req, res) {
        await Acao.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.redirect("/acoes");
    },
}