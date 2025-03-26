import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
compat.resolve.plugins(["import"]);
compat.resolve.rules({
  "import/no-unresolved": "off",
  "import/named": "off",
  "import/default": "off",
  "import/namespace": "off",
  "import/no-absolute-path": "off",
});
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
