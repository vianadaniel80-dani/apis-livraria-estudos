import mongoose from "mongoose";
// import { schemaAutor } from "./Autor.js";

const livroSchema = mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: {
      type: String,
      required: [true, "O título do livro deve ser enviado corretamente"],
    },
    anoLancamento: { type: String },
    editora: {
      type: String,
      required: [true, "A editora do livro deve ser enviada"],
    },
    preco: {
      type: Number,
      min: [0, "O preço não pode ser menor que 0"],
    },
    quantidade_paginas: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor do livro deve ser enviado"],
    },
  },
  { versionKey: false },
);

const livros = mongoose.model("livros", livroSchema);

export { livros, livroSchema };
