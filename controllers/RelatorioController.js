import { Relatorio } from "../models/Relatorio.js";

import pdf from "html-pdf";
import fs from "fs";
import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY");
}
import { logger } from "../utils/logger.mjs";
const REDIRECT_URL = "/relatorio";
class RelatorioController {
  async create(req, res) {
    try {
      if (!req.body) {
        return res.redirect(REDIRECT_URL);
      }

      const novoRelatorio = {
        data: req.body.data,
        filtrarProcesso: req.body.filtrarProcesso,
        numeroProcesso: req.body.numeroProcesso,
        tipoProcesso: req.body.tipoProcesso,
        especialidade: req.body.especialidade,
        tipoExportacao: req.body.tipoExportacao,
      };

      await Relatorio.create(novoRelatorio);
      logger.info("Relatorio criado com sucesso!");

      return res.render("relatorio", {
        sucesso: "Relatorio criado com sucesso!",
      });
    } catch (erro) {
      logger.error("ouve um erro ao criar o relatorio", erro);

      return res.render("relatorio", {
        erro: "Erro ao criar relatorio",
      });
    }
  }
  async deletar(req, res) {
    try {
      const relatorio = await Relatorio.findOne({
        where: { id: req.body.id },
      });
      if (!relatorio) {
        return res.redirect("/relatorios");
      }

      await Relatorio.destroy({
        where: { id: req.body.id },
      });
      logger.info("Relatorio deletado com sucesso!");
      return res.redirect("/relatorios");
    } catch (error) {
      logger.error("erro ao deletar relatorio", error);
      return res.redirect("/relatorios");
    }
  }
  async getAllRelatorios(req, res) {
    try {
      const relatorios = await Relatorio.findAll();
      // console.log(relatorios.map((relatorio) => relatorio.toJSON()));
      const relatoriosJson = relatorios.map((relatorio) => relatorio.toJSON());

      const relatorioDataFormatada = [];

      relatoriosJson.forEach((relatorio) => {
        const data = new Date(relatorio.data);
        data.setDate(data.getDate() + 1);
        relatorioDataFormatada.push({
          ...relatorio,
          data: formatDate(data.toISOString()),
        });
      });

      return res.render("mostrarelatorios", {
        relatorios: relatorioDataFormatada,
      });
    } catch (error) {
      console.error(error);
      return res.render("mostrarelatorios", {
        erro: "Erro ao carregar relatorios",
      });
    }
  }
  async atualizarRelatorio(req, res) {
    const { id } = req.body;
    try {
      const relatorio = await Relatorio.findOne({
        where: { id },
      });
      if (!relatorio) {
        logger.error("Relatorio não encontrado");
        return res.redirect("/relatorios");
      }
      await Relatorio.update(
        {
          ...req.body,
          updateAt: Date.now(),
        },
        { where: { id } }
      );
      logger.info("Relatorio atualizado com sucesso");

      return res.redirect("/relatorios");
    } catch (error) {
      logger.error("erro ao obter relatorios", error);
      return res.redirect("/relatorios");
    }
  }
  async getRelatorioByid(req, res) {
    try {
      const { id } = req.params;
      const { dataValues } = await Relatorio.findOne({
        where: { id },
      });
      return res.render("editar", {
        relatorio: { ...dataValues },
      });
    } catch (error) {
      return res.render("editar");
    }
  }
  async exportarRelatorio(req, res) {
    const fileName = `download/${new Date().getTime()}.pdf`;
    try {
      const relatorios = await Relatorio.findAll();
      const relatoriosJson = relatorios.map((relatorio) => relatorio.toJSON());
      const relatorioDataFormatada = [];

      relatoriosJson.forEach((relatorio) => {
        const data = new Date(relatorio.data);
        data.setDate(data.getDate() + 1);
        relatorioDataFormatada.push({
          ...relatorio,
          data: formatDate(data.toISOString()),
        });
      });

      res.render(
        "template",
        {
          relatorios: relatorioDataFormatada,
          template: true,
        },
        async function (err, HTML) {
          pdf.create(HTML, {}).toFile(fileName, function (err, result) {
            if (err) {
              console.log(err);
              return res.status(400).send({
                message: errorHandler.getErrorMessage(err),
              });
            }
            res.download(fileName, function () {
              fs.unlinkSync(fileName);
            });
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}

export default new RelatorioController();
