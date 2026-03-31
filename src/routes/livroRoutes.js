import express from "express";
import LivroController from "../controllers/livroController.js";
import paginacaoAPIs from "../middlewares/paginacao.js";

const routes = express.Router();

routes.get("/livros", LivroController.buscarLivros, paginacaoAPIs);
routes.get("/livros/busca", LivroController.buscarLivrosPorFiltro, paginacaoAPIs);
routes.get("/livros/:id", LivroController.buscarLivrosPorId);

routes.post("/livros", LivroController.cadastrarLivro);
routes.delete("/livros", LivroController.deletarLivros);

routes.put("/livros/:id", LivroController.atualizarLivroPorID);

export default routes;
