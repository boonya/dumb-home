module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
    meteor: true,
    jest: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {meteor: true},
  },
  plugins: ['react'],
  rules: {
    'max-len': ['warn', 120, 2, {ignoreComments: true}],
    'no-warning-comments': 'warn',
    'react/sort-comp': [1, {
      order: ['static-methods', 'lifecycle', 'render', '/^on.+$/', 'everything-else'],
    }],
    'react/jsx-filename-extension': [1, { 'extensions': ['.js'] }],
    'react/prefer-stateless-function': ['warn', { ignorePureComponents: false }],
    'consistent-return': 0,
    'react/jsx-props-no-spreading': 0,
    'object-curly-newline': ['warn', { ObjectPattern: { multiline: true } }],
    'no-underscore-dangle': ['error', { allow: ['_id', '_data'] }],
    'import/no-extraneous-dependencies': ['error', { devDependencies: [
      '.storybook/**/*',
      '**/*.test.js',
      '**/*.stories.js'
    ] }],
    'no-restricted-globals': ['warn', {
        name: 'confirm',
        message: 'Try to avoid confirm alert',
    }],
    'jsx-a11y/media-has-caption': 0,
  },
};
