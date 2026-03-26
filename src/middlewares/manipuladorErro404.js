import ErroRota404 from "../errors/ErroRota404.js";

function manipulador404(req, resp, next) {
  // resp.status(404).json({ message: "Rota não encontrada" });
  const erro404 = new ErroRota404();
  next(erro404);
}

export default manipulador404;
