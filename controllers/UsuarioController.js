const Usuario = require("../models/Usuario");

const bcrypt = require("bcryptjs");

module.exports = {
  loadIndex(req, res) {
    Usuario.findByPk(req.user.id).then((data) => {
      res.render("ejs/index", { usuario: data });
    });
  },

  loadLogin(req, res) {
    if (req.query.fail)
      res.render("ejs/login", { message: "Senha ou Login Errado!" });
    else res.render("ejs/login", { message: null });
  },
};
