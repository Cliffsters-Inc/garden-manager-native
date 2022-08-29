/** @see https://github.com/expo/expo/tree/main/packages/eslint-config-universe */
module.exports = {
    "settings": {
      "import/ignore": [
      "react-native"
    ]
    },
  rules: {
    "import/order": "off",
    "prettier/prettier": "off",
  },
  extends: [
    "universe/native",
    "universe/web",
    "universe/shared/typescript-analysis",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
};
