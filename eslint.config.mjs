import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Adaptador para configs antigas
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  // Aplica ESLint a todos os arquivos na pasta render/
  {
    files: ["render/**/*.{js,jsx,ts,tsx}"], // <- Isso cobre render/components/
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  },
];
