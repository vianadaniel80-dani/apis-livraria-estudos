import mongoose from "mongoose";

mongoose.Schema.Types.String.set("validate", {
  // 1. Primeiro garante que é uma string (evita erro no .trim())
  // 2. Depois garante que não está vazia após o trim
  validator: (valor) => typeof valor === "string" && valor.trim() !== "",
  message: "O campo '{PATH}' deve ser um texto e não pode estar vazio",
});
