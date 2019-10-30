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
    'eslint:recommended',
    'plugin:vue/recommended'
  ],
  plugins: [//@todo
    'import',
    'node',
    'promise',
    'standard',
    'vue'
  ],
  rules: {
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off',
    'no-console': 1
  }
};
