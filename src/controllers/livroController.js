import { livros, autor } from "../models/index.js";
import ErroRota404 from "../errors/ErroRota404.js";
// import ErroRequisicaoIncorreta from "../errors/ErroRequisicaoIncorreta.js";

class LivroController {
  static buscarLivros = async (req, resp, next) => {
    try {
      // throw new Error("Erro Simulado de Servidor");
      const queryLivro = livros.find({});
      req.resultadoQuery = queryLivro;
      next();
    } catch (error) {
      next(error);
    }
  };

  static buscarLivrosPorFiltro = async (req, resp, next) => {
    const busca = await this.processaBusca(req.query);

    if (!busca || Object.keys(busca).length === 0) {
      resp.status(200).json([]); // Retorna um array vazio se a busca for null (por exemplo, quando o autor não é encontrado)
      return; // Encerra a execução da função para evitar continuar com a busca no banco de dados
    }

    try {
      // const listaLivros = await livros.find(busca).populate("autor");

      req.resultadoQuery = livros.find(busca);
      next();

      // if (!listaLivros || listaLivros.length === 0) {
      //   next(new ErroRota404("Nenhum livro encontrado").enviarRespostaErro(resp));
      // } else {
      //   resp.status(200).json(listaLivros);
      // }
    } catch (error) {
      next(error);
    }
  };

  static processaBusca = async (parametros) => {
    const { editora, titulo, preco, minPaginas, maxPaginas, nomeAutor } = parametros;

    let busca = {};

    if (editora) busca.editora = { $regex: editora, $options: "i" };
    if (titulo) busca.titulo = { $regex: titulo, $options: "i" };
    if (preco) busca.preco = preco;

    if (minPaginas || maxPaginas) busca.quantidade_paginas = {};
    if (minPaginas) busca.quantidade_paginas.$gte = minPaginas;
    if (maxPaginas) busca.quantidade_paginas.$lte = maxPaginas;

    if (nomeAutor) {
      const autorEncontrado = await autor.findOne({ nome: { $regex: nomeAutor, $options: "i" } });

      if (!autorEncontrado) {
        busca = null; // Se o autor não for encontrado, definimos a busca como null para garantir que nenhum livro seja retornado
      } else {
        busca.autor = autorEncontrado._id;
      }
    }
    return busca;
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
          if (!livro.autor) {
            next(new ErroRota404("O campo 'autor' é obrigatório para cada livro").enviarRespostaErro(resp));
          }

          // Verificando se o autor existe no banco de dados
          const consultaAutor = await autor.findById(livro.autor);

          // Se o autor não existir, lançamos um erro para ser tratado pelo manipulador de erros
          if (!consultaAutor) {
            next(new ErroRota404("ID do autor não encontrado").enviarRespostaErro(resp));
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

      if (!deletarLivros) {
        next(new ErroRota404("Nenhum livro encontrado para deletar").enviarRespostaErro(resp));
      }

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
      const listaLivrosID = await livros.findById(livroID, {}, { autopopulate: false }).populate("autor", "nome nacionalidade");

      if (!listaLivrosID) {
        next(new ErroRota404(`Nenhum livro encontrado para o ID - ${livroID}`).enviarRespostaErro(resp));
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
      const atualizacaoLivroID = await livros.findByIdAndUpdate(livroId, req.body, {
        runValidators: true,
      });

      if (!atualizacaoLivroID) {
        next(new ErroRota404("ID do autor não encontrado").enviarRespostaErro(resp));
      } else {
        resp.status(200).json({ message: "Livro atualizado com sucesso" });
      }
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;
