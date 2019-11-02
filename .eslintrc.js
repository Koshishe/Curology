module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'array-callback-return': ['error', { allowImplicit: true }],
    'comma-dangle': ['error', 'only-multiline'],
    'func-style': ['error', 'declaration', { 'allowArrowFunctions': true }],
    'function-paren-newline': ['error', 'multiline'],
    'no-console': 1,
    'no-loop-func': 'error',
    'no-param-reassign': ['error', { 'props': true }],
    'no-var': 'error',
    'object-shorthand': ['error', 'always', { 'avoidQuotes': true }],
    'prefer-destructuring': ['error', { 'array': false, 'object': true }, { 'enforceForRenamedProperties': true }],
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'semi': ['error', 'always'],
    'space-before-function-paren': ['error', { 'anonymous': 'always', 'named': 'never', 'asyncArrow': 'always' }],
    'template-curly-spacing': ['error', 'always'],
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off'
  }
};
