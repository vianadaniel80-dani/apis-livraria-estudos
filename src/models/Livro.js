import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";
// import { autor, schemaAutor } from "./Autor";
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
      enum: {
        values: ["Companhia das Letras", "Casa do Código", "Teste Daniel"],
        message: "A editora deve ser uma das seguintes: Companhia das Letras, Casa do Código ou Teste Daniel",
      },
    },
    preco: {
      type: Number,
      min: [0, "O preço não pode ser menor que 0"],
    },
    quantidade_paginas: {
      type: Number,
      // min: [100, "A quantidade de páginas deve ser entre 100 e 5000"],
      // max: [5000, "A quantidade de páginas deve ser entre 100 e 5000"],
      validate: {
        validator: (valor) => valor >= 10 && valor <= 5000,
        message: "A quantidade de páginas deve ser entre 10 e 5000, o valor enviado foi {VALUE}",
      },
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor do livro deve ser enviado"],
      autopopulate: true,
    },
    // autor: schemaAutor,
  },
  { versionKey: false },
);

livroSchema.plugin(autopopulate);
const livros = mongoose.model("livros", livroSchema);

export { livros, livroSchema };
