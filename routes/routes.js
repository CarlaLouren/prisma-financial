import { Router } from "express";

import views from "./viewsRoutes.js";
import UsuarioController from "../controllers/UsuarioController.js";

const routes = Router();

routes.use(views);
routes.post("/usuario/registrar", UsuarioController.registrar);
routes.post("/usuario/login", UsuarioController.login);

export { routes };
