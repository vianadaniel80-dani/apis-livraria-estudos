class ErroBase extends Error {
  constructor(mensagem = "Ocorreu um erro inesperado", status = 500) {
    super();
    this.mensagem = mensagem;
    this.status = status;
  }

  enviarRespostaErro(resp) {
    resp.status(this.status).json({
      message: this.mensagem,
      status: this.status,
    });
  }
}

export default ErroBase;
