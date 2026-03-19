import "dotenv/config";
import app from "./src/app.js";

const PORT = process.env.PORT_SERVER || 3000;

// O segredo está em capturar a instância do servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor escutando na porta ${PORT}`);
});

// 1. Tratamento de erro direto no servidor
server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.error(`--- A porta ${PORT} está ocupada. ---`);
    console.log("Tentando fechar processos antigos...");
    // Força o encerramento para o nodemon tentar de novo limpo
    process.exit(1);
  }
});

// 2. Garante que o processo feche a porta ao receber o sinal do Nodemon/Terminal
process.on("SIGINT", () => {
  server.close(() => {
    console.log("Servidor encerrado com sucesso.");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  server.close(() => {
    process.exit(0);
  });
});
