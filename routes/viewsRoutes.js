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
views.get("/cadastro", (req, res) => {
  res.render("cadastro");
});

export default views;
