import { Router } from "express";
const views = Router();

views.get("/", (req, res) => {
  res.render("home");
});

views.get("/sobrenos", (req, res) => {
  res.render("sobrenos");
});

views.get("/contato", (req, res) => {
  res.render("contato");
});

views.get("/relatorio", (req, res) => {
  res.render("relatorio");
});

views.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

views.get("/login", (req, res) => {
  res.render("login");
});

export default views;
