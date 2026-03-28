import ErroRequisicaoIncorreta from "./ErroRequisicaoIncorreta.js";
import mongoose from "mongoose";

class ErroValidacao extends ErroRequisicaoIncorreta {
  constructor(error) {
    const castError = Object.values(error.errors).find((e) => e instanceof mongoose.Error.CastError);

    if (castError) {
      super(`O campo '${castError.path}' esta com tipo de valor inválido`, 400);
    } else {
      const mensagensDeErro = Object.values(error.errors)
        .map((msgErro) => msgErro.message)
        .join("; ");

      super(`Os seguintes erros foram encontrados: ${mensagensDeErro}`, 400);
    }
  }
}

export default ErroValidacao;
