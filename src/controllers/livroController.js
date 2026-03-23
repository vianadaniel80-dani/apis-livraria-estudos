import { livros } from "../models/Livro.js";
import { autor } from "../models/Autor.js";

class LivroController {
  static buscarLivros = async (req, resp, next) => {
    try {
      const listaLivros = await livros.find({});

      if (!listaLivros) {
        resp.status(404).json({ message: "Nenhum livro encontrado" });
      } else {
        resp.status(200).json(listaLivros);
      }
    } catch (error) {
      next(error);
    }
  };

  static buscarLivrosPorEditora = async (req, resp, next) => {
    const editora = req.query.editora;

    try {
      const listaLivros = await livros.find({ editora: editora });

      if (!listaLivros || listaLivros.length === 0) {
        resp
          .status(404)
          .json({ message: "Nenhum livro encontrado para essa editora" });
      } else {
        resp.status(200).json(listaLivros);
      }
    } catch (error) {
      next(error);
    }
  };

  static buscarLivrosPorPreco = async (req, resp, next) => {
    const preco = req.query.preco;

    try {
      const listaLivros = await livros.find({ preco: preco });

      if (!listaLivros || listaLivros.length === 0) {
        resp
          .status(404)
          .json({ message: "Nenhum livro encontrado com esse preço" });
      } else {
        resp.status(200).json(listaLivros);
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, resp, next) => {
    // Recebendo o livro do corpo da requisição
    const novoLivro = req.body;

    // Verificando se o livro é um array ou um objeto e garantindo que seja um array para facilitar o processamento
    const livroCompleto = Array.isArray(novoLivro) ? novoLivro : [novoLivro];
    // Verificando se o autor existe para cada livro e criando um novo array de livros completos com os IDs dos autores
    try {
      const livroCompletoComAutor = await Promise.all(
        // Para cada livro, verificamos se o autor existe e, se existir, retornamos um novo objeto de livro com o ID do autor
        livroCompleto.map(async (livro) => {
          // Verificando se o autor existe no banco de dados
          const consultaAutor = await autor.findById(livro.autor);

          // Se o autor não existir, lançamos um erro para ser tratado pelo manipulador de erros
          if (!consultaAutor) {
            throw new Error(`Autor com ID ${livro.autor} não encontrado`);
          } else {
            // Se o autor existir, retornamos um novo objeto de livro com o ID do autor
            return {
              ...livro,
              autor: consultaAutor._id,
            };
          }
        }),
      );

      // Criando os livros no banco de dados usando o array de livros completos com os IDs dos autores
      const livroCadastrado = await livros.create(livroCompletoComAutor);
      // Retornando a resposta com o livro cadastrado e o status de criação (201)
      resp.status(201).json(livroCadastrado);
    } catch (error) {
      // Se ocorrer um erro durante o processo, passamos o erro para o manipulador de erros usando a função next
      next(error);
    }
  };

  static deletarLivros = async (req, resp, next) => {
    try {
      const deletarLivros = await livros.deleteMany({});
      resp.status(200).json({
        message: "Livros deletados com sucesso",
        linhasDeletadas: deletarLivros.deletedCount,
      });
    } catch (error) {
      next(error);
    }
  };

  static buscarLivrosPorId = async (req, resp, next) => {
    try {
      const livroID = req.params.id;
      const listaLivrosID = await livros.findById(livroID);

      if (!listaLivrosID) {
        resp.status(404).json({ message: "ID do livro não encontrado" });
      } else {
        resp.status(200).json(listaLivrosID);
      }
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivroPorID = async (req, resp, next) => {
    try {
      const livroId = req.params.id;
      const atualizacaoLivroID = await livros.findByIdAndUpdate(
        livroId,
        req.body,
        {
          runValidators: true,
        },
      );

      if (!atualizacaoLivroID) {
        resp.status(404).json({ message: "ID do livro não encontrado" });
      } else {
        resp.status(200).json({ message: "Livro atualizado com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
