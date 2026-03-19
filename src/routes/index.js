import express from "express";
import livros from "./livroRoutes.js";
import autores from "./autorRoutes.js";

const routes = (app) => {
  app.route("/").get((req, resp) => {
    resp.status(200).send("API's de Livraria");
  });

  app.use(express.json(), livros, autores);
};

export default routes;
