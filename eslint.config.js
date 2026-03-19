import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      semi: ["error", "always"], // Força ponto e vírgula
      quotes: ["error", "double"], // Força aspas duplas
      "no-unused-vars": "warn", // Apenas avisa sobre variáveis não usadas
      //"padded-blocks": ["error", "always"], // Força blocos de código com linhas em branco
    },
  },
]);
