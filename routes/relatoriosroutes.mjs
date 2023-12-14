import { Router } from "express";
import RelatorioController from "../controllers/RelatorioController.js";
const relatorio = Router();

relatorio.get("/relatorio/editar/:id", RelatorioController.getRelatorioByid);
relatorio.get("/relatorios", RelatorioController.getAllRelatorios);
relatorio.get("/exportar", RelatorioController.exportarRelatorio);

relatorio.post("/relatorio/cadastrar", RelatorioController.create);

relatorio.post("/relatorio/atualizar", RelatorioController.atualizarRelatorio);
relatorio.post("/relatorio/deletar", RelatorioController.deletar);

export default relatorio;
