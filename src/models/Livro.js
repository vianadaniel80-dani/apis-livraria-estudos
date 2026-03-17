import mongoose from "mongoose";
import { schemaAutor } from "./Autor.js"

const livroSchema = mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { type: String, required: true},
    anoLancamento: { type: String },
    editora: { type: String },
    preco: { 
        type: Number,
        min: [0, "O preço não pode ser menor que 0"]
    },
    quantidade_paginas: { type: Number },
    autor: schemaAutor
}, { versionKey: false});

const livros = mongoose.model("livros", livroSchema);

export {livros, livroSchema} ;