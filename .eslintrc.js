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
    'plugin:import/errors',
    'standard',
    'eslint:recommended',
    'airbnb-base',
    'plugin:vue/recommended'
  ],
  plugins: [
    'vue'
  ],
  rules: {
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off'
  }
};
