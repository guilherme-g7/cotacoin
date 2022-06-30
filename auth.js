const bcrypt = require("bcryptjs");
const Usuario = require("./models/Usuario");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport) {


  passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
  });

  passport.deserializeUser((id, done) => {
    try {
      Usuario.findByPk(id).then((usuario) => {
        done(null, usuario);
      });
    } catch (err) {
      done(err, null);
    }
  });

  passport.use(
      new LocalStrategy(
          //campos que vem do form de login
          {
            usernameField: 'email',
            passwordField: 'senha'
          },
          (email, senha, done) => {

            try {

              return Usuario.findOne({
                where: {
                  email: email,
                },
              }).then((usuario) => {

                if (!usuario) {
                  return done(null, false);
                }


                const isValid = bcrypt.compareSync(senha, usuario.senha);

                if (!isValid) return done(null, false);

                return done(null, usuario);
              });
            } catch (err) {
              done(err, false);
            }
          }
      )
  );
};