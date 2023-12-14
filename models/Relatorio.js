import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

export const Relatorio = sequelize.define("relatorios", {
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  filtrarProcesso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  numeroProcesso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoProcesso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  especialidade: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoExportacao: {
    type: DataTypes.ENUM("PDF"),
    allowNull: false,
  },
});

// Relatorio.drop();
Relatorio.sync({ force: true });
