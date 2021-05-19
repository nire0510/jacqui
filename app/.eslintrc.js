module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'arrow-parens': ['error', 'always'],
    'prefer-const': 2,
    'no-process-exit': 0,
    'no-magic-numbers': ['error', {
      'ignore': [-1, 0, 1, 10, 100, 1000]
    }],
    'func-style': ['warn', 'declaration', { 'allowArrowFunctions': true }],
    'prefer-destructuring': ['off'],
    'curly': 'error',
    'max-len': ['error', 130],
    'brace-style': ['error', 'stroustrup'],
    'nonblock-statement-body-position': ['error', 'below'],
    'quotes': ['error', 'single'],
    'prefer-promise-reject-errors': 0,
    'valid-jsdoc': 'warn',
    'no-eval': 'error',
    'no-plusplus': 0,
    'no-bitwise': 0,
    'no-param-reassign': 1,
    'operator-linebreak': ['error', 'after'],
    'newline-before-return': 'error',
    'newline-after-var': 'error',
    'no-underscore-dangle': 'off',
    'padding-line-between-statements': [
      'error',
      {
        'blankLine': 'always',
        'prev': ['block'],
        'next': '*'
      }
    ]
  }
}
