import { Router } from "express";

import views from "./viewsRoutes.js";
import UsuarioController from "../controllers/UsuarioController.js";
import relatorio from "./relatoriosroutes.mjs";

const routes = Router();

routes.post("/usuario/registrar", UsuarioController.registrar);
routes.post("/usuario/login", UsuarioController.login);
routes.use(views);
routes.use(relatorio);
routes.use((req, res, next) => {
  res.render("errorotas");
});
export { routes };
