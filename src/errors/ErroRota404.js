import ErroBase from "./ErroBase.js";

class ErroRota404 extends ErroBase {
  constructor(mensagem = "Rota não encontrada") {
    super(mensagem, 404);
  }
}

export default ErroRota404;
