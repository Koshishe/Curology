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
    'import',
    'vue'
  ],
  rules: {
    'vue/html-self-closing': 0,
    'vue/no-v-html': 'off'
  },
  overrides: [
    {
      files: [
        'postcss.config.js',
        'webpack.*.conf.js'
      ],
      rules: {
        'global-require': 'off',
        'import/no-extraneous-dependencies': 'off',
        'import/no-dynamic-require': 'off'
      }
    }
  ]
};
