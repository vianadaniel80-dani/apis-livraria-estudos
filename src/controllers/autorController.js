import { autor } from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, resp, next) => {
    try {
      const listaAutores = await autor.find({});
      resp.status(200).json(listaAutores);
    } catch (error) {
      next(error);
    }
  };

  static criarAutor = async (req, resp, next) => {
    try {
      await autor.create(req.body);
      resp.status(201).json({ message: "Autor cadastrado com sucesso" });
    } catch (error) {
      next(error);
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

  static atualizarAutorPorID = async (req, resp, next) => {
    try {
      const atualizacaoAutorID = await autor.findByIdAndUpdate(
        req.params.id,
        req.body,
      );

      if (!atualizacaoAutorID) {
        resp.status(404).json({ message: "ID do Autor não encontrado" });
      } else {
        resp
          .status(204)
          .json({ message: "Registro autor atualizado com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  };

  static deletarAutorPorID = async (req, resp, next) => {
    try {
      const excluirAutorID = await autor.findByIdAndDelete(req.params.id);

      if (!excluirAutorID) {
        resp.status(404).json({ message: "ID do Autor não encontrado" });
      } else {
        resp.status(200).json({
          message: `Autor ${excluirAutorID.nome} deletado com sucesso`,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  static deletarTodosAutores = async (req, resp, next) => {
    try {
      await autor.deleteMany({});
      resp.status(200).json({ message: "Base de autores limpa com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;
