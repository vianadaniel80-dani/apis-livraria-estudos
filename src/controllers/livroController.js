import { livros } from "../models/Livro.js"
import { autor } from "../models/Autor.js"

class LivroController {


    static async buscarLivros(req, resp) {

        try {
            const listaLivros = await livros.find({});
            resp.status(200).json(listaLivros);
        } catch (error) {
            resp.status(500).json({ message: `${error.message} - Falha na requisição` })
        }

    }

    static async buscarLivrosPorEditora(req, resp) {

        const editora = req.query.editora;

        try {
            const listaLivros = await livros.find({ editora: editora });
            resp.status(200).json(listaLivros);
        } catch (error) {
            resp.status(500).json({ message: `${error.message} - Falha na requisição` })
        }

    }

    static async buscarLivrosPorPreco(req, resp) {

        const preco = req.query.preco;

        try {
            const listaLivros = await livros.find({ preco: preco });
            resp.status(200).json(listaLivros);
        } catch (error) {
            resp.status(500).json({ message: `${error.message} - Falha na requisição` })
        }

    }


    static async cadastrarLivro(req, resp) {

        const novoLivro = req.body;

        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = { ...novoLivro, autor: { ...autorEncontrado._doc } }
            const cadastraLivro = await livros.create(livroCompleto);
            resp.status(201).json({
                message: "Livro cadastrado com sucesso",
                livro: cadastraLivro
            })

        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição`
            });
        }
    }

    static async deletarLivros(req, resp) {
        try {
            const deletarLivros = await livros.deleteMany({});
            resp.status(200).json({
                message: "Livros deletados com sucesso",
                linhasDeletadas: deletarLivros.deletedCount
            });
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição`
            });
        }

    }

    static async buscarLivrosPorId(req, resp) {
        try {
            const livroID = req.params.id;
            const listaLivrosID = await livros.findById(livroID);
            resp.status(200).json(listaLivrosID);
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição`
            });
        }
    }

    static async atualizarLivroPorID(req, resp) {
        try {
            const livroId = req.params.id;
            await livros.findByIdAndUpdate(livroId, req.body, { runValidators: true });
            resp.status(200).json({ message: `Livro atualizado com sucesso` });
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição`
            });
        }
    }

}

export default LivroController;