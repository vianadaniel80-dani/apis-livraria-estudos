import express from "express";
import conexaoMongo from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

const conexao = await conexaoMongo();

conexao.on("error", (erro) => {
  console.error("Erro de conexão com o Banco ", erro);
});

conexao.once("open", () => {
  console.log("Conexão realizada com sucesso ao DB Mongo");
});

const app = express();

// app.use((req, res, next) => {
//   const tempo = Date.now();
//   console.log("Código de um novo middleware", req.url, tempo);
//   next();
// });

routes(app);

app.use(manipuladorDeErros);

export default app;
