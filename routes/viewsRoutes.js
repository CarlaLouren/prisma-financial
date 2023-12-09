import { Router } from "express";
const views = Router()

views.get("/", (req, res) => {
  res.render("home");
});




export default views