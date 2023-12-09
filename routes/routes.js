import { Router } from "express";
const routes = Router();

import views from "./viewsRoutes.js";
routes.use(views);


export { routes };
