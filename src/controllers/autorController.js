import { autor } from "../models/Autor.js"

class AutorController {

    static async listarAutores(req, resp) {
        try {
            const listaAutores = await autor.find({});
            resp.status(200).json(listaAutores);
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }

    static async criarAutor(req, resp) {
        try {
            await autor.create(req.body);
            resp.status(201).json({ message: "Autor cadastrado com sucesso" });
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }

    static async listarAutorPorID(req, resp) {
        try {
            const autorID = await autor.findById(req.params.id);
            resp.status(200).json(autorID);
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }

    static async atualizarAutorPorID(req, resp) {
        try {
            await autor.findByIdAndUpdate(req.params.id, req.body);
            resp.status(204).json({message: "Registro autor atualizado com sucesso"});
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }

    static async deletarAutorPorID(req, resp) {
        try {
            await autor.findByIdAndDelete(req.params.id);
            resp.status(200).json({message: "Registro removido com sucesso"});
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }

    static async deletarTodosAutores(req, resp) {
        try {
            await autor.deleteMany({});
            resp.status(200).json({message: "Base de autores limpa com sucesso"});
        } catch (error) {
            resp.status(500).json({
                message: `${error.message} - Falha na requisição ao buscar`
            });
        }
    }



}

export default AutorController;