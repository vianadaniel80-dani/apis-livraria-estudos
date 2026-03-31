import express from "express";
import AutorController from "../controllers/autorController.js";
import paginacaoAPIs from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/autor", AutorController.listarAutores, paginacaoAPIs);
routes.get("/autor/:id", AutorController.listarAutorPorID);
routes.post("/autor", AutorController.criarAutor);
routes.put("/autor/:id", AutorController.atualizarAutorPorID);
routes.delete("/autor/:id", AutorController.deletarAutorPorID);
routes.delete("/autor", AutorController.deletarTodosAutores);

export default routes;
