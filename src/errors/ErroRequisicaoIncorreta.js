import ErroBase from "./ErroBase.js";

class ErroRequisicaoIncorreta extends ErroBase {
  constructor(mensagem = "A requisição contém dados inválidos", status = 400) {
    super(mensagem, status);
  }
}

export default ErroRequisicaoIncorreta;
