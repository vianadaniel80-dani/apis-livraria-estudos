import { autor } from "../models/index.js";
import ErroRota404 from "../errors/ErroRota404.js";

class AutorController {
  static listarAutores = async (req, resp, next) => {
    try {
      req.resultadoQuery = autor.find({});
      next();
    } catch (error) {
      next(error);
    }
  };

  static criarAutor = async (req, resp, next) => {
    try {
      const cadastroAutor = await autor.create(req.body);

      if (cadastroAutor.length === 0 || !cadastroAutor) {
        next(new ErroRota404("Nenhum autor encontrado").enviarRespostaErro(resp));
      }

      resp.status(201).json({ message: "Autor cadastrado com sucesso", cadastroAutor: cadastroAutor });
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorID = async (req, resp, next) => {
    try {
      const autorID = await autor.findById(req.params.id);

      if (!autorID) {
        next(new ErroRota404("Nenhum autor com encontrado para o ID").enviarRespostaErro(resp));
      } else {
        resp.status(200).json(autorID);
      }
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutorPorID = async (req, resp, next) => {
    try {
      const atualizacaoAutorID = await autor.findByIdAndUpdate(req.params.id, req.body);

      if (!atualizacaoAutorID) {
        next(new ErroRota404("ID do autor não encontrado").enviarRespostaErro(resp));
      } else {
        resp.status(204).json({ message: "Registro autor atualizado com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  };

  static deletarAutorPorID = async (req, resp, next) => {
    try {
      const excluirAutorID = await autor.findByIdAndDelete(req.params.id);

      if (!excluirAutorID) {
        next(new ErroRota404("ID do autor não encontrado").enviarRespostaErro(resp));
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
      const deletarAutor = await autor.deleteMany({});

      if (!deletarAutor || deletarAutor.deletedCount === 0) {
        next(new ErroRota404("Nenhum autor encontrado para deletar").enviarRespostaErro(resp));
      }

      resp.status(200).json({ message: "Base de autores limpa com sucesso" });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;
