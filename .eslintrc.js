// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    'no-mixed-operators': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-invalid-regexp': 0,
    'semi': 0,
    'no-undef': 0,
    'no-throw-literal': 'off',
    'no-trailing-spaces': 'off',
    'no-fallthrough': 'off',
    'handle-callback-err': 0,
    'space-before-function-paren': 0,
    'prefer-promise-reject-errors': 0,
    'valid-template-root': 'off'
  }
}
