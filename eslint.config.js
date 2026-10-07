const js = require('@eslint/js');
const globals = require('globals');
const security = require('eslint-plugin-security');

module.exports = [
  { ignores: ['coverage/**', 'reports/**', 'node_modules/**'] },
  js.configs.recommended,
  security.configs.recommended,
  {
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node, ...globals.jest }
    },
    rules: {
      eqeqeq: 'error',
      'no-var': 'warn',
      'no-empty': 'error'
    }
  }
];
