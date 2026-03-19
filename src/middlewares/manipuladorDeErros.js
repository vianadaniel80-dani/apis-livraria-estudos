import mongoose from "mongoose";

// eslint-disable-next-line no-unused-vars
function manipuladorErros(error, req, resp, next) {
  if (error instanceof mongoose.Error.CastError) {
    resp
      .status(400)
      .json({ message: "Um ou mais dados fornecidos estão incorretos" });
  } else {
    resp.status(500).json({
      message: `${error.message} - Falha na requisição`,
    });
  }
}

export default manipuladorErros;
