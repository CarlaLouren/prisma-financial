import express from "express";
import { engine } from "express-handlebars";
import path from "path";
import moment from "moment";
import { sequelize } from "./database/db.js";

const app = express();
import { routes } from "./routes/routes.js";

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.engine(
  "handlebars",
  engine({
    helpers: {
      formatDate(date) {
        return moment(date).format("DD/MM/YYYY");
      },
      eq(a, b, options) {
        return a === b ? a : b;
      },
    },
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static(path.join(path.resolve(), "public")));
app.locals.publicPath = "/public";

app.use(routes);

try {
  await sequelize.authenticate();
  console.log("Conexão com DB estabelicidade com sucesso!.");
} catch (error) {
  console.error("Erro ao conectar com o banco de dados:", error);
}

app.listen(3001, () => {
  console.log(" 🚀 Rodando no localhost:3001 🚀 ");
});
