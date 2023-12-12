import bcrypt from "bcrypt";
import { sequelize, DataTypes } from "../database/db.js";

export const Usuario = sequelize.define("usuarios", {
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue("password", hash);
    },
    get() {
      return this.getDataValue("password");
    },
  },
  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Usuario.prototype.verificarSenha = function (senha) {
  return bcrypt.compareSync(senha, this.password);
};

// Usuario.drop();
Usuario.sync({ force: true });
