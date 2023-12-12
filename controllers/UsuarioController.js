import { Usuario } from "../models/Usuario.js";

class UsuarioController {
  async login() {
    try {
      const { email, password } = req.body;

      console.log(email, password);
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario) {
        return res.render("login", { erro: "Usuário não encontrado" });
      }

      if (!usuario.verificarSenha(password)) {
        return res.render("login", { erro: "Senha invalida" });
      }

      if (usuario.verificarSenha(password)) {
        return res.redirect("/");
      }
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      return res.redirect("/");
    }
  }
  async registrar(req, res) {
    try {
      const { nomeCompleto, email, password, confirmPassword, genero } =
        req.body;

      if (password.toString() !== confirmPassword.toString()) {
        return res.render("cadastro", { senhaErro: "Senhas são diferentes" });
      }
      // Verifica se já existe um usuário com o mesmo e-mail
      const usuarioExistente = await Usuario.findOne({ where: { email } });

      if (usuarioExistente) {
        return res.render("cadastro", { erro: "E-mail já cadastrado" });
      }

      // Cria o novo usuário
      const novoUsuario = await Usuario.create({
        nomeCompleto,
        email,
        password,
        genero,
      });
      // Remove o hash da senha da resposta
      novoUsuario.password = undefined;
      // Redireciona para a página de login
      res.redirect("/login");
    } catch (error) {
      res.redirect("/login");
    }
  }
}

export default new UsuarioController();
