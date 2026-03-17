import express from "express";
import LivroController from "../controllers/livroController.js";

const routes = express.Router();

routes.get("/livros", LivroController.buscarLivros);
routes.get("/livros/busca", LivroController.buscarLivrosPorEditora);
routes.get("/livros/busca", LivroController.buscarLivrosPorPreco);
routes.get("/livros/:id", LivroController.buscarLivrosPorId);

routes.post("/livros", LivroController.cadastrarLivro);
routes.delete("/livros", LivroController.deletarLivros);

routes.put("/livros/:id", LivroController.atualizarLivroPorID);

export default routes;
