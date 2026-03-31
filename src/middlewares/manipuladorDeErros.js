import mongoose from "mongoose";
import ErroBase from "../errors/ErroBase.js";
import ErroRequisicaoIncorreta from "../errors/ErroRequisicaoIncorreta.js";
import ErroValidacao from "../errors/ErroValidacao.js";
import ErroRota404 from "../errors/ErroRota404.js";

// eslint-disable-next-line no-unused-vars
function manipuladorErros(error, req, resp, next) {
  console.log(error);

  if (error instanceof mongoose.Error.CastError) {
    new ErroRequisicaoIncorreta().enviarRespostaErro(resp);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErroValidacao(error).enviarRespostaErro(resp);
  } else if (error instanceof ErroRota404) {
    error.enviarRespostaErro(resp);
  } else if (error instanceof TypeError) {
    new ErroRequisicaoIncorreta().enviarRespostaErro(resp);
  } else {
    new ErroBase().enviarRespostaErro(resp);
  }
}

export default manipuladorErros;
