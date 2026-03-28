import mongoose from "mongoose";

const schemaAutor = new mongoose.Schema(
  {
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: {
      type: String,
      required: [true, "O nome do autor(a) deve ser enviado corretamente"],
    },
    nacionalidade: { type: String, cast: false },
  },
  { versionKey: false },
);

const autor = mongoose.model("autores", schemaAutor);

export { autor, schemaAutor };
