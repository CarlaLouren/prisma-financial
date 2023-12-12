import { Sequelize, DataTypes } from "sequelize";
export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database/database.sqlite",
});
export default {
  sequelize,
  DataTypes,
};
