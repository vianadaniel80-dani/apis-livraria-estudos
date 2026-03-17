import express from 'express';
import conexaoMongo from "./config/dbConnect.js"
import routes from "./routes/index.js"

const conexao = await conexaoMongo();

conexao.on("error", (erro) => {
    console.error("Erro de conexão com o Banco ", erro);
});

conexao.once("open", () => {
    console.log("Conexão realizada com sucesso ao DB Mongo");
});

const app = express();
routes(app);


// Buscar Index do Livro por ID
function buscarLivroID(id) {
    return livros.findIndex((livro) => {
        return livro.id === parseInt(id);
    });
};

// Consulta de todos os livros
app.get("/", (req, resp) => {
    resp.status(200).send('Curso de Node JS Express');
});

// Consultar Livro por ID
app.get("/livros/:id", (req, resp) => {
    const indexLivro = buscarLivroID(req.params.id);
    resp.status(200).json(livros[indexLivro]);
});

// app.get("/livros/:id", (req, resp) => {
//     const buscaLivro = livros.findById(req.params.id)
//     resp.status(200).send(buscaLivro);
// });


// Consulta de todos os livros
// app.get("/livros", async (req, resp) => {
//     const listaLivros = await livro.find({});
//     resp.status(200).json(listaLivros);
// });

// Cadastrar um livro
app.post("/livros", (req, resp) => {
    livros.push(req.body);
    resp.status(201).send("Livro cadastrado com sucesso");
});

// Atualizar um Livro por ID
app.put("/livros/:id", (req, resp) => {
    const indexLivro = buscarLivroID(req.params.id);
    livros[indexLivro].titulo = req.body.titulo;
    resp.status(201).json(livros);
});

// Deletar um livro por ID
app.delete("/livros/:id", (req, resp) => {
    const indexLivro = buscarLivroID(req.params.id);
    livros.splice(indexLivro, 1);
    resp.status(200).send("Livro removido com sucesso");
});


export default app;