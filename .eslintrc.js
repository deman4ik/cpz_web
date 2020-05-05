module.exports = {
    env: {
        browser: true,
        es6: true
    },
    extends: [
        "airbnb-typescript",
        "airbnb/hooks",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly"
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 2020,
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        "operator-linebreak": 0,
        "no-underscore-dangle": 0,
        "no-return-assign": 0,
        "no-console": 0,
        "object-curly-newline": 0,
        "global-require": 0,
        "linebreak-style": 0,
        "implicit-arrow-linebreak": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-cycle": 0,
        "array-bracket-spacing": [2, "always"],
        "jsx-quotes": [2, "prefer-single"],
        "comma-dangle": 0,
        "no-nested-ternary": 0,
        "spaced-comment": 0,
        "arrow-parens": 0,
        "no-plusplus": 0,
        "no-bitwise": 0,
        "@typescript-eslint/no-implied-eval": 0,
        "@typescript-eslint/no-eval": 0,
        "@typescript-eslint/no-throw-literal": 0,
        "@typescript-eslint/no-explicit-any": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "jsx-a11y/no-static-element-interactions": 0,
        "jsx-a11y/click-events-have-key-events": 0,
        "max-len": 0,
        camelcase: "off",
        "@typescript-eslint/camelcase": 0,
        "import/prefer-default-export": 0,
        "react/jsx-one-expression-per-line": 0,
        "react/jsx-closing-bracket-location": 0,
        "react/no-array-index-key": 0,
        "react/destructuring-assignment": 0,
        "react/jsx-props-no-spreading": 0,
        "react/display-name": 0,
        "react/prop-types": 0
    }
};
