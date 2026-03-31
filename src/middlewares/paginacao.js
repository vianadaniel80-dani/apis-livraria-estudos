import ErroRequisicaoIncorreta from "../errors/ErroRequisicaoIncorreta.js";
import ErroRota404 from "../errors/ErroRota404.js";

async function paginacaoAPIs(req, resp, next) {
  try {
    const resultadoQuery = req.resultadoQuery;

    let { limite = 5, pagina = 1, ordenacao = "_id:1" } = req.query;
    let [campoOrdenacao, ordem] = ordenacao.split(":");

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    if (isNaN(limite) || isNaN(pagina) || limite <= 0 || pagina <= 0) {
      return next(new ErroRequisicaoIncorreta("Os valores na URL da requisição estão incorretos").enviarRespostaErro(resp));
    } else {
      const resultadoPaginado = await resultadoQuery
        .find()
        .sort({ [campoOrdenacao]: ordem })
        .skip((pagina - 1) * limite)
        .limit(limite)
        //.populate("autor")
        .exec();

      if (!resultadoPaginado) {
        next(new ErroRota404("Nenhum resultado encontrado").enviarRespostaErro(resp));
      } else {
        resp.status(200).json(resultadoPaginado);
      }
    }
  } catch (error) {
    next(error);
  }
}

export default paginacaoAPIs;
