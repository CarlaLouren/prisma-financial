import { Router } from "express";
const views = Router();

views.get("/", (req, res) => {
  res.render("home");
});

views.get("/sobrenos", (req, res) => {
  res.render("sobrenos");
});

export default views;
