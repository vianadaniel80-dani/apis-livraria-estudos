import { autor } from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, resp) => {
    try {
      const listaAutores = await autor.find({});
      resp.status(200).json(listaAutores);
    } catch (error) {
      resp.status(500).json({
        message: `${error.message} - Falha na requisição ao buscar`,
      });
    }
  };

  static criarAutor = async (req, resp) => {
    try {
      await autor.create(req.body);
      resp.status(201).json({ message: "Autor cadastrado com sucesso" });
    } catch (error) {
      resp.status(500).json({
        message: `${error.message} - Falha na requisição ao buscar`,
      });
    }
  };

  static listarAutorPorID = async (req, resp, next) => {
    try {
      const autorID = await autor.findById(req.params.id);

      if (!autorID) {
        resp.status(404).json({ message: "ID do Autor não encontrado" });
      } else {
        resp.status(200).json(autorID);
      }
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutorPorID = async (req, resp) => {
    try {
      await autor.findByIdAndUpdate(req.params.id, req.body);
      resp
        .status(204)
        .json({ message: "Registro autor atualizado com sucesso" });
    } catch (error) {
      resp.status(500).json({
        message: `${error.message} - Falha na requisição ao buscar`,
      });
    }
  };

  static deletarAutorPorID = async (req, resp) => {
    try {
      await autor.findByIdAndDelete(req.params.id);
      resp.status(200).json({ message: "Registro removido com sucesso" });
    } catch (error) {
      resp.status(500).json({
        message: `${error.message} - Falha na requisição ao buscar`,
      });
    }
  };

  static deletarTodosAutores = async (req, resp) => {
    try {
      await autor.deleteMany({});
      resp.status(200).json({ message: "Base de autores limpa com sucesso" });
    } catch (error) {
      resp.status(500).json({
        message: `${error.message} - Falha na requisição ao buscar`,
      });
    }
  };
}

export default AutorController;
