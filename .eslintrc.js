module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/typescript/recommended", "@vue/prettier", "@vue/prettier/@typescript-eslint"],
    parserOptions: {
        ecmaVersion: 2020,
        parser: "@typescript-eslint/parser" // ESLint的解析器，用于解析TypeScript，从而检查和规范TypeScript代码
    },
    rules: {
        // "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
        // "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-console": "off",
        "no-debugger": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-use-before-define": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/consistent-type-assertions": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "no-useless-escape": "off",
        "prefer-const": "off",
        "@typescript-eslint/camelcase": ["off", { properties: "always" }],
        "@typescript-eslint/no-this-alias": "off"
    }
};
