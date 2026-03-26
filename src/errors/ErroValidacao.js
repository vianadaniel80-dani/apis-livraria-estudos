import ErroRequisicaoIncorreta from "./ErroRequisicaoIncorreta.js";

class ErroValidacao extends ErroRequisicaoIncorreta {
  constructor(error) {
    const mensagensDeErro = Object.values(error.errors)
      .map((msgErro) => msgErro.message)
      .join("; ");

    super(`Erro de validação: ${mensagensDeErro}`, 400);
  }
}

export default ErroValidacao;
